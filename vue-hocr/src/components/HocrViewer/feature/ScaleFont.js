import {HocrDOM} from 'hocr-dom'

export default class ScaleFont {

  constructor({fontFamily='x', fonts={}}) {
    this.fontFamily = fontFamily
    this.minFontSize = 2
    this.wrapClass   = 'hocr-viewer-wrap'
    this.wrap = {}
  }

  apply(dom) {
    console.time('toggleScaleFont')

    // wrapper element containing wrappers for font-size expansion
    this.wrap = document.createElement('span')
    this.wrap.classList.add(this.wrapClass)
    document.body.appendChild(this.wrap)
    HocrDOM.queryHocrAll(dom, {terminal: true}).forEach((el) => this.scaleFont(el))
    this.wrap.remove()

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
    if (fontSize > this.minFontSize) {
      this.wrap.style.fontSize = fontSize + 'px'
      const fontSizeH = fontSize * height / this.wrap.offsetHeight
      const fontSizeW = fontSize * width / this.wrap.offsetWidth
      fontSize = (fontSizeH < fontSizeW) ? fontSizeH : fontSizeW
    }
    if (fontSize < this.minFontSize) {
      fontSize = this.minFontSize
    }
    el.style.fontSize = fontSize + 'px'
  }

}

