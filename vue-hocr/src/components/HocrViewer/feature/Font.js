import {HocrDOM} from 'hocr-dom'
import Utils from '@/utils'

export default class Font {

  constructor({fontFamily='x', fontsAvailable}) {
    this.fontFamily = fontFamily

    const styleId = 'hocr-view-font-styles'
    Utils.removeCssFragment(styleId)
    Object.keys(fontsAvailable).forEach((font) => {
      let cssUrl = fontsAvailable[font].cssUrl
      if (cssUrl) Utils.addCssFragment(styleId, `@import "${cssUrl}";\n`)
    })
  }

  apply(dom) {
    HocrDOM.queryHocrAll(dom).forEach(el => {
      el.style.fontFamily = this.fontFamily
    })
  }

}

