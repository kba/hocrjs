/*
 * Copyright (c) 2016-2017 Konstantin Baierer
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */

import BaseComponent from '@/components/base'
import {HocrParser} from '@/parser'
import Utils from '@/utils'
import HocrjsToolbar from '@/components/hocr-toolbar'
import defaultConfig from '@/store/state'

import './hocr-viewer.scss'

class HocrjsViewer extends BaseComponent {

    constructor(config={}) {
        super()
        this.config = Object.assign({}, defaultConfig, config)
        this.parser = new HocrParser(this.config)
    }

    findByOcrClass(query) {
        query = (query || {})

        // Expect tag
        query.tag = (query.tag || '*')

        // Arbitrary clauses
        query.clauses = (query.clauses || '')

        // Return only hocr-elements with a bbox
        if (query.title) query.clauses += `[title*="${query.title}"]`

        // Return specific ocr_* / ocrx_* classes
        query.class = (query.class || '')
        if (typeof query.class === 'string') query.class = [query.class]

        // Build querySelectorAll query
        let qs = query.class.map(function(cls) {
            if (cls.indexOf('ocr') === 0) return cls
            if (cls === '') return 'ocr'
            if (cls.indexOf('x_') !== 0) return `ocr_${cls}`
            return `ocr${cls}`
        }).map(function(cls) {
            return `:scope ${query.tag}[class^="${cls}"]${query.clauses}`
        }).join(',')
        this.log(1, "findByOcrClass:", qs)
        let context = (query.context || document.querySelector('.' + this.config.rootClass))
        let set = Array.prototype.slice.call(context.querySelectorAll(qs))

        // terminal: Return only hocr-elements containing no hocr-elements themselves
        // container: Opposite
        if (query.terminal)
            set = set.filter(function(el) {
                if (!el.querySelector('*[class^="ocr"]')) return el
            })
        if (query.container)
            set = set.filter(function(el) {
                if (el.querySelector('*[class^="ocr"]')) return el
            })

        // Arbitrary filter function
        if (query.filter) {
            set = set.filter(query.filter)
        }

        return set
    }

    placeOcrElements() {
        this.findByOcrClass({
            title: 'bbox'
        }).forEach((el) => {
            let coords = this.parser.bbox(el)
            el.style.left = coords[0] + "px"
            el.style.top = coords[1] + "px"
            el.style.width = coords[2] - coords[0] + "px"
            el.style.height = coords[3] - coords[1] + "px"
        })
        let coords = this.parser.bbox(document.querySelector('.ocr_page'))
        document.querySelector('body').style.minHeight = coords[2] + 'px'
    }

    toggleScaleFont(onoff) {
        // wrapper element containing wrappers for font-size expansion
        console.time('toggleScaleFont')
        let wrap = document.querySelector(`.${this.config.features.scaleFont.wrapClass}`)
        if (!wrap) {
            wrap = document.createElement('span')
            wrap.classList.add(this.config.features.scaleFont.wrapClass)
            this.dom.appendChild(wrap)
        }
        if (onoff) {
            this.findByOcrClass({terminal: true}).forEach((el) => this.scaleFont(el, wrap))
            // wrap.style.display = 'none'
        } else {
            this.findByOcrClass({terminal: true}).forEach((el) => el.style.fontSize = null)
        }
        console.timeEnd('toggleScaleFont')
    }

    scaleFont(el, wrap) {
        if (el.textContent.trim().length === 0) return
        if (!(el.textContent in this.cache.scaleFont)) {
            // wrap.setAttribute('class', el.getAttribute('class'))
            // wrap.style.width = '100%'
            wrap.style.fontFamily = el.style.fontFamily
            wrap.innerHTML = el.textContent
            let w = 'offsetWidth'
            let h = 'offsetHeight'
            let fontsize = Math.min(el[w], el[h])
            let min = this.config.features.scaleFont.minFontSize
            wrap.style.fontSize = fontsize + 'px'
            if (fontsize > min && wrap[h] > el[h]) {
                fontsize -= wrap[h] - el[h]
                wrap.style.fontSize = fontsize + 'px'
            }
            while (fontsize > min && wrap[w] > el[w]) {
                fontsize -= 1
                wrap.style.fontSize = fontsize + 'px'
            }
            // if (iterations > 1) console.debug(iterations, el.textContent, wrap[h], el[h], wrap[w], el[w])
            this.cache.scaleFont[el.textContent] = fontsize
        }
        el.style.fontSize = this.cache.scaleFont[el.textContent] + 'px'
    }

    toggleTooltips(onoff) {
        let style = document.querySelector('#' + this.config.features.tooltips.styleId)
        if (!onoff) {
            if (style) style.remove()
        } else {
            let ocrClasses = {}
            for (let el of this.findByOcrClass()) {
                ocrClasses[el.getAttribute('class')] = true
            }
            this.log(0, "Detected OCR classes", Object.keys(ocrClasses))
            if (!style) {
                style = document.createElement('style')
                style.setAttribute('id', this.config.features.tooltips.styleId)
            }
            style.appendChild(document.createTextNode(Object.keys(ocrClasses).map((cls) =>
                `.${this.config.rootClass} .${cls}:hover::before { content: "${cls}"; }\n`
            ).join("\n")))
            document.head.appendChild(style)
        }
    }

    toggleBackgroundImage(onoff) {
        let page = this.dom.querySelector('.ocr_page')
        if (onoff) {
            this.findByOcrClass({
                title: 'image'
            }).forEach((el) => {
                let imageFile = this.parser.image(el)
                page.style.backgroundImage = `url(${imageFile})`
            })
        } else {
            page.style.backgroundImage = ''
            // delete this.dom.style.backgroundImage
        }
    }

    toggleContentEditable(onoff) {
        let onContentEditableInput = (ev) => {
            console.warn("Scaling of contentEditable is broken right now")
            if (this.config.features.scaleFont.enabled) {
                this.scaleFont(ev.target)
                this.findByOcrClass({
                    context: ev.target
                }).forEach((child) => {
                    this.scaleFont(child)
                })
            }
        }
        this.findByOcrClass({
            class: ['line', 'x_word'],
            clauses: '',
        }).forEach((el) => {
            if (onoff) {
                el.setAttribute('contentEditable', 'true')
                el.addEventListener('input', onContentEditableInput)
            } else {
                el.removeAttribute('contentEditable')
                el.removeEventListener('input', onContentEditableInput)
            }
        })
    }

    toggleFeature(feature, onoff) {
        this.dom.classList.toggle(`feature-${feature}`, onoff)
        let toggle = 'toggle' + feature.substr(0, 1).toUpperCase() + feature.substring(1)
        if (toggle in this) {
            this.log(0, `Calling this.${toggle}`)
            this[toggle](onoff)
        }
    }

    scaleTo(scaleFactor) {
        let page = this.dom.querySelector('.ocr_page')
        let coords = this.parser.bbox(document.querySelector('.ocr_page'))
        if (typeof scaleFactor === 'string') {
            if (scaleFactor === 'height') {
                scaleFactor = window.innerHeight / coords[3]
            } else if (scaleFactor === 'width') {
                scaleFactor = window.innerWidth / coords[2]
            } else if (scaleFactor === 'original') {
                scaleFactor = 1
            } else if (scaleFactor.match(/^[+-]/)) {
                scaleFactor = this.config.scaleFactor + parseFloat(scaleFactor)
            }
        }
        Object.assign(this.config, {scaleFactor})
        page.style.transform = `scale(${this.config.scaleFactor})`
        page.style.transformOrigin = 'top left'
        this.$emit('scale-to', this.config.scaleFactor)
    }

    onConfigChange() {
        Object.keys(this.config.features).forEach((feature) => {
            this.toggleFeature(feature, this.config.features[feature].enabled)
        })
    }

    setFont(selectedFont) {
      if (selectedFont) this.config.selectedFont = selectedFont
      this.findByOcrClass().forEach((el) => {
        el.style.fontFamily = this.config.selectedFont
      })
      this.$emit('set-font', this.config.selectedFont)
    }

    init() {
        Object.keys(this.config.fonts).forEach((font) => {
            let cssUrl = this.config.fonts[font].cssUrl
            if (cssUrl) Utils.addCssFragment('hocr-view-font-styles', `@import "${cssUrl}";\n`)
        })

        this.dom = this.config.dom
        if (typeof this.dom === 'string') {
            this.dom = document.querySelector(this.dom)
        }

        this.dom.classList.add(this.config.rootClass)

        if (this.config.enableToolbar)
          this.toolbar = new HocrjsToolbar({$parent: this, config: this.config})

        // place the elements on the page
        this.placeOcrElements()

        // set font
        this.setFont()
        this.cache = {scaleFont: {}}

        // Events
        this.onConfigChange()
        window.addEventListener('resize', () => this.onConfigChange())
    }

}

export {HocrjsViewer}
