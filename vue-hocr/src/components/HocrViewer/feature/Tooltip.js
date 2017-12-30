import {HocrDOM} from 'hocr-dom'
import Utils from '@/utils'

export default class ScaleFont {

  constructor() {
    this.styleId = 'hocr-viewer-tooltip-style'
  }

  apply(dom) {
    let ocrClasses = {}
    for (let el of HocrDOM.queryHocrAll(dom)) {
      ocrClasses[el.getAttribute('class')] = true
    }
    console.log("Detected OCR classes", Object.keys(ocrClasses))

    Utils.removeCssFragment(this.styleId)
    Utils.addCssFragment(this.styleId, Object.keys(ocrClasses).map(
        cls => `.${cls}:hover::before { content: "${cls}"; }\n`
      ).join("\n")
    )
  }

}

