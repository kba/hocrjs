/*
 * Copyright (c) 2016-2017 Konstantin Baierer
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */

import Vue from 'vue'
import '@/normalize.scss'
import 'normalize.css'
import butwhy from 'vue-hocr'
const {HocrViewer, HocrViewerStyle, HocrToolbarStyle} = butwhy // for some reason 'import {HocrViewer} from 'vue-hocr' wont work
import Utils from 'vue-hocr/src/utils'

Vue.component('hocr-viewer', HocrViewer)

const hocr = document.querySelector('html').innerHTML
Utils.addCssFragment('hocr-viewer-styles', HocrViewerStyle.toString())
Utils.addCssFragment('hocr-toolbar', HocrToolbarStyle.toString())
document.body.innerHTML = '<div id="app"/>'
window.hocrapp = new Vue({
  el: "#app",
  components: {HocrViewer},
  template: `<hocr-viewer :hocr="hocr" />`,
  data: {hocr}
})
