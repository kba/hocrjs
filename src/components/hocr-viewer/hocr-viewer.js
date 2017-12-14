/*
 * Copyright (c) 2016-2017 Konstantin Baierer
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */

import BaseComponent from '@/components/base'
import Utils from '@/utils'
import HocrjsToolbar from '@/components/hocr-toolbar'
import defaultConfig from '@/store/state'
import {HocrDOM} from 'hocr-dom'

import template from './hocr-viewer.html'
import style from './hocr-viewer.scss'

export default {
  name: 'HocrViewer',
  style,
  template,
  props: {
    hocr: {type: String, required: true},
  },
  computed: {
    hocrDom() {
      const dom = document.createElement('div')
      dom.innerHTML = this.hocr
      if (this.enableLayout) {
        HocrDOM.queryHocrAll(this.hocrDom, {
            title: 'bbox'
        }).forEach((el) => {
            let coords = HocrDOM.getHocrProperties(el)
            el.style.left = coords[0] + "px"
            el.style.top = coords[1] + "px"
            el.style.width = coords[2] - coords[0] + "px"
            el.style.height = coords[3] - coords[1] + "px"
        })
      }
      return dom.innerHTML
    },
  },
  data() {return {
    enableLayout: false,
  }},
  mounted() {
    this.config = Object.assign({}, defaultConfig)

    Object.keys(this.config.fonts).forEach((font) => {
      let cssUrl = this.config.fonts[font].cssUrl
      if (cssUrl) Utils.addCssFragment('hocr-view-font-styles', `@import "${cssUrl}";\n`)
    })

    // if (this.config.enableToolbar)
    //   this.toolbar = new HocrjsToolbar({$parent: this, config: this.config})

    // // place the elements on the page
    // this.placeOcrElements()

    // // set font
    // this.setFont()
    // this.cache = {scaleFont: {}}

    // // Events
    // this.onConfigChange()
    // window.addEventListener('resize', () => this.onConfigChange())
  },
  methods: {
  },
}

class HocrjsViewer extends BaseComponent {

    constructor(config={}) {
        super()
    }

    placeOcrElements() {
        HocrDOM.queryHocrAll(this.hocrDom, {
            title: 'bbox'
        }).forEach((el) => {
            let coords = HocrDOM.getHocrProperties(el)
            el.style.left = coords[0] + "px"
            el.style.top = coords[1] + "px"
            el.style.width = coords[2] - coords[0] + "px"
            el.style.height = coords[3] - coords[1] + "px"
        })
        // XXX https://github.com/kba/hocrjs/issues/8
        // let coords = document.querySelector('.ocr_page').hocr.bbox
        // document.querySelector('body').style.minHeight = coords[2] + 'px'
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
            HocrDOM.queryHocrAll(this.hocrDom, {terminal: true}).forEach((el) => this.scaleFont(el, wrap))
            // wrap.style.display = 'none'
        } else {
            HocrDOM.queryHocrAll(this.hocrDom, {terminal: true}).forEach((el) => el.style.fontSize = null)
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
            for (let el of HocrDOM.queryHocrAll(this.hocrDom)) {
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
            HocrDOM.queryHocrAll(this.hocrDom, {
                title: 'image'
            }).forEach((el) => {
                let imageFile = HocrDOM.getHocrProperties(el).image
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
                HocrDOM.queryHocrAll(this.hocrDom, {
                    context: ev.target
                }).forEach((child) => {
                    this.scaleFont(child)
                })
            }
        }
        HocrDOM.queryHocrAll(this.hocrDom, {
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
        let coords = document.querySelector('.ocr_page').hocr.bbox
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
      HocrDOM.queryHocrAll(this.hocrDom).forEach((el) => {
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
