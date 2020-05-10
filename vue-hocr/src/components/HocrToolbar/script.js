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
  created() {
    document.addEventListener('keypress', this.handleKeypress)
  },
  destroyed() {
    document.removeEventListener('keypress', this.handleKeypress)
  },
  methods: {
    handleKeypress(evt) {
      const {shiftKey, key} = evt
      if (shiftKey) {
        if (key === 'W') {
          this.toggle()
        } else if(key === 'B') {
          this.$parent.toggleFeature('ScaleFont')
        }
      }
    },
    toggle() {
      this.expanded = ! this.expanded
    }
  }

}
