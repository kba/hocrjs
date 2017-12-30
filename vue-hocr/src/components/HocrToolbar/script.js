export default {
  name: 'HocrToolbar',
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
