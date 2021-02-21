/*
 * Copyright (c) 2016-2017 Konstantin Baierer
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */

import {HocrDOM} from 'hocr-dom'
import HocrToolbar from '../HocrToolbar/index.vue'
import defaultConfig from '@/store/state'

import featuresAvailable from './feature'

export default {
  name: 'HocrViewer',
  components: {HocrToolbar},
  props: {
    hocr:                           {type: String,  required: true},
    initialZoom:                    {type: Number,  default:  1},
    featureBackgroundImage:         {type: Boolean, default: false},
    featureContentEditable:         {type: Boolean, default: true},
    featureFont:                    {type: Boolean, default: true},
    featureLayout:                  {type: Boolean, default: true},
    featureScaleFont:               {type: Boolean, default: false},
    featureTransparentText:         {type: Boolean, default: false},
    featureTooltip:                 {type: Boolean, default: false},
    featureHighlight:               {type: Boolean, default: true},
    featureHighlightPage:           {type: Boolean, default: false},
    featureHighlightNotPage:        {type: Boolean, default: false},
    featureHighlightBlank:          {type: Boolean, default: true},
    featureHighlightInlineNotBlank: {type: Boolean, default: true},
    featureHighlightInlineBlank:    {type: Boolean, default: false},
    featureHighlightLine:           {type: Boolean, default: true},
    featureHighlightPar:            {type: Boolean, default: true},
    featureHighlightCarea:          {type: Boolean, default: true},
    featureDisableEmStrong:         {type: Boolean, default: true},
    enableToolbar:                  {type: Boolean, default: true},
    expandToolbar:                  {type: Boolean, default: false},
    imagePrefix:                    {type: String,  default:  ''},
    font:                           {type: String,  default:  'sans-serif'},
    fontsAvailable:                 {type: Object,  default() {return  {
      'sans-serif': {},
      serif: {},
      monospace: {},
      UnifrakturCook: {cssUrl: 'https://fonts.googleapis.com/css?family=UnifrakturCook:700'},
      UnifrakturMaguntia: {cssUrl: 'https://fonts.googleapis.com/css?family=UnifrakturMaguntia'},
      'Old Standard TT': {cssUrl: 'https://fonts.googleapis.com/css?family=Old+Standard+TT'},
      Cardo: {cssUrl: 'https://fonts.googleapis.com/css?family=Cardo'},
      'Noto Serif': {cssUrl: 'https://fonts.googleapis.com/css?family=Noto+Serif:400,400i,700&subset=latin-ext'},
      'Libre Baskerville': {cssUrl: 'https://fonts.googleapis.com/css?family=Libre+Baskerville:400,400i,700&subset=latin-ext'},
    }}},
  },
  data() {
    return {
      enableLayout: false,
      currentPageIdx: 0,
      config: defaultConfig,
      featuresEnabled: Object.keys(this.$props)
        .filter(k => k.startsWith('feature') && this[k])
        .map(k => k.replace('feature', '')),
      fontFamily: this.font,
      currentZoom: this.initialZoom,
    }},
  computed: {

    classList() {
      const ret = {
        'hocr-viewer': true,
        'hocr-viewer-toolbar-enabled': this.enableToolbar
      }
      this.featuresEnabled.map(featureName => ret[`hocr-viewer-feature-${featureName}`] = true)
      return ret
    },

    lastPageIdx() {
      const pages = HocrDOM.queryHocrAll(this.shadowDom, 'page')
      return pages.length
    },

    currentPage() {
      const pages = HocrDOM.queryHocrAll(this.shadowDom, 'page')
      if (!pages.length) {
        console.warn("No .ocr_page element found. Is this hOCR?")
        return {}
      }
      return pages[this.currentPageIdx]
    },

    containerStyle() {
      const page = this.currentPage
      const {bbox} = HocrDOM.getHocrProperties(HocrDOM.queryHocr(page))
      const pageHeight = bbox[3] - bbox[1] + 1
      return {
        transform: `scale(${this.currentZoom})`,
        'transform-origin': 'top left',
        height: `${pageHeight}px`,
      }
    },

    featuresAvailable() {
      const ret = {}
      Object.keys(this.$props)
        .filter(k => k.startsWith('feature'))
        .map(k => k.replace('feature', ''))
        .map(k => {if (!(k in ret)) ret[k] = true})
      Object.assign(ret, featuresAvailable)
      return ret
    },

    features() {
      const ret = {}
      Object.keys(featuresAvailable).map(featureName => {
        if (this.featuresEnabled.includes(featureName)) {
          const featureClass = featuresAvailable[featureName]
          ret[featureName] = (typeof featureClass === 'function')
            ? new featureClass(this)
            : true
        }
      })
      return ret
    },

    shadowDom() {
      console.log("enter shadowDom")
      const dom = document.createElement('div')
      dom.innerHTML = this.hocr
      return dom
    },

    hocrDom() {
      const dom = document.createElement('div')
      //dom.innerHTML = `<html><body>${this.currentPage.innerHTML}</body></html>`
      dom.innerHTML = this.hocr
      Object.keys(this.features).map(featureName => {
        const featureClass = this.features[featureName]
        if (featureClass.apply) {
          // console.log(`Applying ${featureName}`)
          this.features[featureName].apply(dom)
        }
      })
      return dom
    },

    currentZoomRounded() {
      return Math.floor(this.currentZoom * 10000) / 100.0
    },

  },
  methods: {

    prevPage() {
      this.currentPageIdx -= Math.max(this.currentPageIdx - 1, 0)
    },

    nextPage() {
      this.currentPageIdx -= Math.min(this.currentPageIdx + 1, this.lastPageIdx)
    },

    isFeatureEnabled(featureName) {return this.featuresEnabled.includes(featureName)},

    toggleFeature(featureName) {
      if (this.isFeatureEnabled(featureName))
        this.featuresEnabled.splice(this.featuresEnabled.indexOf(featureName), 1)
      else
        this.featuresEnabled.push(featureName)
    },

    zoom(scaleFactor) {
      let container = this.$el.querySelector('.hocr-viewer-container')
      let {bbox} = HocrDOM.getHocrProperties(HocrDOM.queryHocr(container))
      if (typeof scaleFactor === 'string') {
        if (scaleFactor === 'height') {
          scaleFactor = window.innerHeight / bbox[3]
        } else if (scaleFactor === 'width') {
          scaleFactor = window.innerWidth / bbox[2]
        } else if (scaleFactor === 'reset') {
          scaleFactor = 1
        } else if (scaleFactor.match(/^[+-]/)) {
          scaleFactor = this.currentZoom + parseFloat(scaleFactor)
        } else {
          console.error(`Bad scaleFactor: '${scaleFactor}'`)
        }
      }
      this.currentZoom = scaleFactor
      this.$emit('scale-to', this.config.scaleFactor)
    },

  },
}
