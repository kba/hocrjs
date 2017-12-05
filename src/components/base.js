import TinyEmitter from 'tiny-emitter'

export default class BaseComponent {

  constructor() {
    this._bus = new TinyEmitter({})
  }

  $on(...args) {this._bus.on(...args)}
  $off(...args) {this._bus.off(...args)}
  $emit(...args) {this._bus.emit(...args)}

}
