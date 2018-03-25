import {HocrDOM} from 'hocr-dom'

export default class Layout {

  apply(dom) {
    HocrDOM.queryHocrAll(dom, {
      title: 'bbox'
    }).forEach((el) => {
      let {bbox} = HocrDOM.getHocrProperties(el)
      el.style.position = 'fixed'
      el.style.left    = bbox[0] + "px"
      el.style.top     = bbox[1] + "px"
      el.style.width   = bbox[2] - bbox[0] + 1 + "px"
      el.style.height  = bbox[3] - bbox[1] + 1 + "px"
    })
  }

}

