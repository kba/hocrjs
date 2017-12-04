import Vue from 'vue'

export default class BaseComponent {

  constructor() {
    this.bus = new Vue({})
  }

  $on(...args) {this.bus.$on(...args)}
  $off(...args) {this.bus.$off(...args)}
  $emit(...args) {this.bus.$emit(...args)}

}
