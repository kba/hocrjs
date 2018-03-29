import {HocrDOM} from 'hocr-dom'

export default class ScaleFont {

  constructor({fontFamily='x', fonts={}}) {
    this.fontFamily = fontFamily
    this.minFontSize = 2
    this.wrapClass   = 'hocr-viewer-wrap'
    this.cache = {}
    // wrapper element containing wrappers for font-size expansion
    this.wrap = document.createElement('span')
    this.wrap.classList.add(this.wrapClass)
  }

  apply(dom) {
    console.time('toggleScaleFont')

    document.body.appendChild(this.wrap)
    HocrDOM.queryHocrAll(dom, {terminal: true}).forEach((el) => this.scaleFont(el))

    console.timeEnd('toggleScaleFont')
  }

  scaleFont(el) {
    const text = el.textContent.trim()
    if (text.length === 0) return
    this.wrap.style.fontFamily = el.style.fontFamily
    this.wrap.innerHTML = text
    const height = parseInt(el.style.height.replace('px', ''))
    const width = parseInt(el.style.width.replace('px', ''))
    let fontSize = height
    if (fontSize <= this.minFontSize) {
      fontSize = this.minFontSize
    } else {
      // console.log({fontSize, width: width, height:height, min, el})
      this.wrap.style.fontSize = fontSize + 'px'
      if (fontSize > this.minFontSize && this.wrap.offsetHeight > height) {
        fontSize -= this.wrap.offsetHeight - height
        this.wrap.style.fontSize = fontSize + 'px'
      }
      while (fontSize > this.minFontSize && this.wrap.offsetWidth > width) {
        this.wrap.style.fontSize = --fontSize + 'px'
      }
      // if (iterations > 1) console.debug(iterations, text, this.wrap.offsetHeight, height, this.wrap.offsetWidth, width)
    }
    el.style.fontSize = fontSize + 'px'
  }

}

