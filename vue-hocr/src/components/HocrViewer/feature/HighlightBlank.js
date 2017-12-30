import {HocrDOM} from 'hocr-dom'

export default class HighlightBlank {

  apply(dom) {
    HocrDOM.queryHocrAll(dom).forEach(el => {
      if (el.innerHTML.trim() === '')
        el.classList.add('hocrjs-blank')
    })
  }

}


