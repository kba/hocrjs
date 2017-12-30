import {HocrDOM} from 'hocr-dom'

export default class BackgroundImage {

  constructor({imagePrefix=''}) {
    this.imagePrefix = imagePrefix
  }

  apply(dom) {
    let page = HocrDOM.queryHocr(dom, 'page')
    HocrDOM.queryHocrAll(dom, {
      title: 'image'
    }).forEach((el) => {
      let imageFile = HocrDOM.getHocrProperties(el).image
      page.style.backgroundImage = `url(${this.imagePrefix}${imageFile})`
    })
  }

}
