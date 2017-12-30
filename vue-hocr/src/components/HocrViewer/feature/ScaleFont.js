import {HocrDOM} from 'hocr-dom'

export default class ScaleFont {

  constructor({fontFamily='x', fonts={}}) {
    this.fontFamily = fontFamily
    this.maxFontSize = 128
    this.minFontSize = 2
    this.wrapClass   = 'hocr-viewer-wrap'
    this.cache = {}
  }

  apply(dom) {
    console.time('toggleScaleFont')

    // wrapper element containing wrappers for font-size expansion
    const wrap = document.createElement('span')
    wrap.classList.add(this.wrapClass)
    document.body.appendChild(wrap)
    HocrDOM.queryHocrAll(dom, {terminal: true}).forEach((el) => this.scaleFont(el, wrap))
    wrap.remove()

    console.timeEnd('toggleScaleFont')
  }

  scaleFont(el, wrap) {
    const text = el.textContent.trim()
    if (text.length === 0) return
    if (!(text in this.cache)) {
      // wrap.setAttribute('class', el.getAttribute('class'))
      // wrap.style.width = '100%'
      wrap.style.fontFamily = el.style.fontFamily
      wrap.innerHTML = text
      const height = parseInt(el.style.height.replace('px', ''))
      const width = parseInt(el.style.width.replace('px', ''))
      let fontSize = Math.min(width, height)
      if (fontSize <= this.minFontSize) {
        this.cache[text] = this.minFontSize
      } else {
        // console.log({fontSize, width: width, height:height, min, el})
        wrap.style.fontSize = fontSize + 'px'
        if (fontSize > this.minFontSize && wrap.offsetHeight > height) {
          fontSize -= wrap.offsetHeight - height
          wrap.style.fontSize = fontSize + 'px'
        }
        while (fontSize > this.minFontSize && wrap.offsetWidth > width) {
          wrap.style.fontSize = --fontSize + 'px'
        }
        // if (iterations > 1) console.debug(iterations, text, wrap.offsetHeight, height, wrap.offsetWidth, width)
        this.cache[text] = fontSize - 1
      }
    }
    el.style.fontSize = this.cache[text] + 'px'
  }

}

