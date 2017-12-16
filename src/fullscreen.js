/*
 * Copyright (c) 2016-2017 Konstantin Baierer
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */

import Vue from 'vue'
import '@/normalize.scss'
import 'normalize.css'
import HocrViewer from '@/components/hocr-viewer'
// window.hocrViewer = new HocrjsViewer({
//   dom: document.querySelector('body'),
// })
// window.hocrViewer.init()

Vue.config.devtools = true
window.vm = new Vue({
  el: "#app",
  components: {HocrViewer},
  template: `<HocrViewer
    :hocr="hocr"
    image-prefix="/home/kba/build/github.com/kba/hocr-dom/hocr-dom-jsdom/test/ocr-fileformat-samples/samples/image/"
  />`,

  data: {
    message: 'Hello from Vue!',
    hocr: document.querySelector('template').innerHTML,
  }
})
