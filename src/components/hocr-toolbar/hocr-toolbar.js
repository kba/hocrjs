import style from './hocr-toolbar.scss'
import template from './hocr-toolbar.html'

export default {
  name: 'HocrToolbar',
  template,
  style,
  computed: {
    classList() {return {
      'hocrjs-toolbar': true,
      expanded: this.expanded,
    }},
  },
  data() {return {
    expanded: true
  }},
  methods: {
    toggle() {
      this.expanded = ! this.expanded
    }
  }

}
