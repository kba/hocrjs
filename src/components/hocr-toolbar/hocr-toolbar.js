import BaseComponent from '@/components/base'
import template from './hocr-toolbar.html'

export default class HocrjsToolbar extends BaseComponent {

  constructor({$parent, config}) {
    super()

    // Add HTML
    const dummyElement = document.createElement('div')
    dummyElement.innerHTML = template
    this.dom = dummyElement.querySelector('div')
    $parent.dom.appendChild(this.dom)

    // handle toggler
    this.dom.querySelector('.toggler').addEventListener('click', (ev) => {
      config.expandToolbar = !config.expandToolbar
      this.toggle(config.expandToolbar)
    })

    // fonts
    let fontSelect = this.dom.querySelector('select.fontlist')
    Object.keys(config.fonts).forEach((font) => {
      let fontOption = document.createElement('option')
      fontOption.innerHTML = font
      fontOption.style.fontSize = 'large'
      fontOption.style.fontFamily = font
      fontSelect.appendChild(fontOption)
    })
    fontSelect.addEventListener('change', (ev) => {
      let selectedFont = ev.target.options[ev.target.selectedIndex].innerHTML
      $parent.setFont(selectedFont)
    })

    // features
    Object.keys(config.features).forEach((feature) => {
      let li = document.createElement('li')
      let checkbox = document.createElement('input')
      let label = document.createElement('label')
      li.appendChild(checkbox)
      li.appendChild(label)
      this.dom.querySelector('.features').appendChild(li)

      label.innerHTML = feature

      checkbox.setAttribute('type', 'checkbox')
      checkbox.checked = config.features[feature].enabled
      li.classList.toggle('checked', checkbox.checked)
      let onChange = (ev) => {
        li.classList.toggle('checked', checkbox.checked)
        config.features[feature].enabled = checkbox.checked
        $parent.toggleFeature(feature, checkbox.checked)
      }
      li.addEventListener('click', (ev) => {
        checkbox.checked = !checkbox.checked
        onChange()
      })
      checkbox.addEventListener('change', onChange)
    })

    // Zoom
    let zoomSlider = this.dom.querySelector('input[type="range"].zoom')
    zoomSlider.addEventListener('input', ev => $parent.scaleTo(ev.target.value / 100.0))
    for (let zoomButton of this.dom.querySelectorAll('button.zoom')) {
      zoomButton.addEventListener('click', ev => $parent.scaleTo(ev.target.dataset.scaleFactor))
    }
    $parent.$on('scale-to', scaleFactor => {
      this.dom.querySelector('span.zoom').innerHTML = Math.floor(scaleFactor * 10000) / 100.0
      zoomSlider.value = scaleFactor * 100
    })

  }

  toggle(onoff) {
    this.dom.classList.toggle('expanded', onoff)
  }

}

