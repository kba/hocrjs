import {HocrDOM} from 'hocr-dom'

export default class ContentEditable {

  $emit(...args) {
    console.log({args})
  }

  apply(dom) {
    HocrDOM.queryHocrAll(dom, {
      class: ['line', 'x_word'],
      clauses: '',
    }).forEach((el) => {
        el.setAttribute('contentEditable', 'true')
        el.addEventListener('input', () => this.$emit('contentEdited', el))
    })
  }

}

