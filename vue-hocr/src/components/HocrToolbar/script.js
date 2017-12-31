export default {
  name: 'HocrToolbar',
  computed: {
    classList() {return {
      'hocrjs-toolbar': true,
      expanded: this.expanded,
    }},
  },
  props: {
    expandedInitial: {type: Boolean, default: false},
  },
  data() {return {
    expanded: this.expandedInitial,
  }},
  methods: {
    toggle() {
      this.expanded = ! this.expanded
    }
  }

}
