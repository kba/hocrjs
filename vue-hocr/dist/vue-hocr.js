(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VueHocr"] = factory();
	else
		root["VueHocr"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const HocrDOM = __webpack_require__(14)
const HocrPropertyParser = __webpack_require__(5)

module.exports = {HocrDOM, HocrPropertyParser}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(13)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hocrDom = __webpack_require__(0);

var _index = __webpack_require__(6);

var _index2 = _interopRequireDefault(_index);

var _state = __webpack_require__(18);

var _state2 = _interopRequireDefault(_state);

var _feature = __webpack_require__(19);

var _feature2 = _interopRequireDefault(_feature);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (c) 2016-2017 Konstantin Baierer
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */

exports.default = {
  name: 'HocrViewer',
  components: { HocrToolbar: _index2.default },
  props: {
    hocr: { type: String, required: true },
    initialZoom: { type: Number, default: 1 },
    featureBackgroundImage: { type: Boolean, default: false },
    featureContentEditable: { type: Boolean, default: true },
    featureFont: { type: Boolean, default: true },
    featureLayout: { type: Boolean, default: true },
    featureScaleFont: { type: Boolean, default: false },
    featureTransparentText: { type: Boolean, default: false },
    featureTooltip: { type: Boolean, default: false },
    featureHighlight: { type: Boolean, default: true },
    featureHighlightPage: { type: Boolean, default: false },
    featureHighlightNotPage: { type: Boolean, default: false },
    featureHighlightBlank: { type: Boolean, default: true },
    featureHighlightInlineNotBlank: { type: Boolean, default: true },
    featureHighlightInlineBlank: { type: Boolean, default: false },
    featureHighlightLine: { type: Boolean, default: true },
    featureHighlightPar: { type: Boolean, default: true },
    featureHighlightCarea: { type: Boolean, default: true },
    featureDisableEmStrong: { type: Boolean, default: true },
    enableToolbar: { type: Boolean, default: true },
    imagePrefix: { type: String, default: '' },
    font: { type: String, default: 'sans-serif' },
    fontsAvailable: { type: Object, default: function _default() {
        return {
          'sans-serif': {},
          serif: {},
          monospace: {},
          UnifrakturCook: { cssUrl: 'https://fonts.googleapis.com/css?family=UnifrakturCook:700' },
          UnifrakturMaguntia: { cssUrl: 'https://fonts.googleapis.com/css?family=UnifrakturMaguntia' },
          'Old Standard TT': { cssUrl: 'https://fonts.googleapis.com/css?family=Old+Standard+TT' },
          Cardo: { cssUrl: 'https://fonts.googleapis.com/css?family=Cardo' },
          'Noto Serif': { cssUrl: 'https://fonts.googleapis.com/css?family=Noto+Serif:400,400i,700&subset=latin-ext' },
          'Libre Baskerville': { cssUrl: 'https://fonts.googleapis.com/css?family=Libre+Baskerville:400,400i,700&subset=latin-ext' }
        };
      }
    }
  },
  data: function data() {
    var _this = this;

    return {
      enableLayout: false,
      config: _state2.default,
      featuresEnabled: Object.keys(this.$props).filter(function (k) {
        return k.startsWith('feature') && _this[k];
      }).map(function (k) {
        return k.replace('feature', '');
      }),
      fontFamily: this.font,
      currentZoom: this.initialZoom
    };
  },

  computed: {
    classList: function classList() {
      var ret = {
        'hocr-viewer': true,
        'hocr-viewer-toolbar-enabled': this.enableToolbar
      };
      this.featuresEnabled.map(function (featureName) {
        return ret['hocr-viewer-feature-' + featureName] = true;
      });
      return ret;
    },
    containerStyle: function containerStyle() {
      var page = _hocrDom.HocrDOM.queryHocr(this.hocrDom, 'page');
      if (!page) {
        console.warn("No .ocr_page element found. Is this hOCR?");
        return {};
      }

      var _HocrDOM$getHocrPrope = _hocrDom.HocrDOM.getHocrProperties(_hocrDom.HocrDOM.queryHocr(page)),
          bbox = _HocrDOM$getHocrPrope.bbox;

      var pageHeight = bbox[3] - bbox[1];
      return {
        transform: 'scale(' + this.currentZoom + ')',
        'transform-origin': 'top left',
        height: pageHeight + 'px'
      };
    },
    featuresAvailable: function featuresAvailable() {
      var ret = {};
      Object.keys(this.$props).filter(function (k) {
        return k.startsWith('feature');
      }).map(function (k) {
        return k.replace('feature', '');
      }).map(function (k) {
        if (!(k in ret)) ret[k] = true;
      });
      Object.assign(ret, _feature2.default);
      return ret;
    },
    features: function features() {
      var _this2 = this;

      var ret = {};
      Object.keys(_feature2.default).map(function (featureName) {
        if (_this2.featuresEnabled.includes(featureName)) {
          var featureClass = _feature2.default[featureName];
          ret[featureName] = typeof featureClass === 'function' ? new featureClass(_this2) : true;
        }
      });
      return ret;
    },
    hocrDom: function hocrDom() {
      var _this3 = this;

      console.log("enter hocrDom");
      var dom = document.createElement('div');
      dom.innerHTML = this.hocr;
      Object.keys(this.features).map(function (featureName) {
        var featureClass = _this3.features[featureName];
        if (featureClass.apply) {
          // console.log(`Applying ${featureName}`)
          _this3.features[featureName].apply(dom);
        }
      });
      return dom;
    },
    currentZoomRounded: function currentZoomRounded() {
      return Math.floor(this.currentZoom * 10000) / 100.0;
    }
  },
  methods: {
    isFeatureEnabled: function isFeatureEnabled(featureName) {
      return this.featuresEnabled.includes(featureName);
    },
    toggleFeature: function toggleFeature(featureName) {
      if (this.isFeatureEnabled(featureName)) this.featuresEnabled.splice(this.featuresEnabled.indexOf(featureName), 1);else this.featuresEnabled.push(featureName);
    },
    zoom: function zoom(scaleFactor) {
      var container = this.$el.querySelector('.hocr-viewer-container');

      var _HocrDOM$getHocrPrope2 = _hocrDom.HocrDOM.getHocrProperties(_hocrDom.HocrDOM.queryHocr(container)),
          bbox = _HocrDOM$getHocrPrope2.bbox;

      if (typeof scaleFactor === 'string') {
        if (scaleFactor === 'height') {
          scaleFactor = window.innerHeight / bbox[3];
        } else if (scaleFactor === 'width') {
          scaleFactor = window.innerWidth / bbox[2];
        } else if (scaleFactor === 'reset') {
          scaleFactor = 1;
        } else if (scaleFactor.match(/^[+-]/)) {
          scaleFactor = this.currentZoom + parseFloat(scaleFactor);
        } else {
          console.error('Bad scaleFactor: \'' + scaleFactor + '\'');
        }
      }
      this.currentZoom = scaleFactor;
      this.$emit('scale-to', this.config.scaleFactor);
    }
  }
};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

/**
 * ### PropertyParser
 * 
 */

const SEPARATOR = ';'

module.exports = class HocrPropertyParser {

    /**
     * #### `new HocrPropertyParser(opts)`
     * 
     * - `@param {Object} opts` All options are `false` by default
     *   - `@param {Object} opts.debug` Whether to log debug output
     *   - `@param {Object} opts.allowUnknown` Whether to silently ignore properties not in the spec
     *   - `@param {Object} opts.allowInvalidNumbers` Whether to silently ignore invalid number (wrong type e.g.)
     *   - `@param {Object} opts.disableCardinalityChecks` Whether to silently ignore invalid argument cardinality
     * 
     */
    constructor(opts={}) {
        Object.assign(this, {
            debug: false,
            allowUnknown: false,
            allowInvalidNumbers: false,
            disableCardinalityChecks: false,
        }, opts)
        this.parsers = {
            'baseline': this.numberParser([parseFloat, parseInt]),
            'bbox': this.numberParser(parseInt, {min:0}, {length:4}),
            'cflow': this.stringParser({collapse:true}),
            'cuts': (args) => { return args.map((arg) => {
                return this.numberParser(parseInt)(arg.split(','))
            })},
            'hardbreak': this.booleanParser({collapse:true}),
            'image': this.stringParser({collapse: true}),
            'imagemd5': this.stringParser({collapse: true}),
            'lpageno': this.stringParser({collapse: true}),
            'ppageno': this.numberParser(parseInt, {min: 0}, {collapse: true}),
            'nlp': this.numberParser(parseFloat, {min: 0, max: 100}),
            'order': this.numberParser(parseInt, {min: 0}, {collapse: true}),
            'poly': this.numberParser(parseInt, {min: 0}, {minLength: 4, modulo: 2}),
            'scan_res': this.numberParser(parseInt, {min: 0}),
            'textangle': this.numberParser(parseFloat, {}, {collapse: true}),
            'x_bboxes': this.numberParser(parseInt, {min:0}),
            'x_font': this.stringParser({collapse:true}),
            'x_fsize': this.numberParser(parseInt, {min:0}),
            'x_confs': this.numberParser(parseFloat, {min:0, max:100}),
            'x_scanner': this.stringParser(),
            'x_source': this.stringParser(),
            'x_wconf': this.numberParser(parseFloat, {min:0, max:100}),
        }
    }

    checkCardinality(args, {
        length = -1,
        modulo = -1,
        collapse = false,
        minLength = 0,
        maxLength = Number.MAX_VALUE,
    }) {
        if (this.disableCardinalityChecks) {
            return args
        }
        if (collapse) length = 1
        if (length > -1 && args.length != length)
            throw Error(`Incorrect number of arguments (${args.length} != ${length})`)
        if (modulo > -1 && length % modulo > 0)
            throw Error(`Number of arguments not a multiple of ${modulo} (${args.length})`)
        if (collapse) return args[0]
        if (args.length < minLength)
            throw Error(`Not enough arguments (${args.length} < ${minLength})`)
        if (args.length > maxLength)
            throw Error(`Too many arguments (${args.length} > ${minLength})`)
        return args
    }

    booleanParser(cardinality={}) {
        return (args) => {
            return this.checkCardinality(args.map((arg) => {
                return Boolean.valueOf()(arg)
            }), cardinality)
        }
    }

    stringParser(cardinality={}) {
        return (args) => {
            return this.checkCardinality(args, cardinality)
        }
    }

    numberParser(fns, {
        min = -Number.MAX_VALUE,
        max = Number.MAX_VALUE,
    } = {}, cardinality={}) {
        if (!Array.isArray(fns)) fns = [fns]
        return (args) => {
            let i = 0
            return this.checkCardinality(args.map((arg) => {
                let parsed = fns[i++ % fns.length](arg)
                if (!this.allowInvalidNumbers) {
                    if (Number.isNaN(parsed))
                        throw Error(`Not a number: '${arg}'`)
                    else if (parsed < min || parsed > max)
                        throw Error(`Not in range [${min}..${max}]: '${arg}'`)
                }
                return parsed
            }), cardinality)
        }
    }

    /**
     * #### `parse(str)`
     * 
     * Tokenize and Parse the hOCR properties in a title string
     * 
     */
    parse(s) {
        let tokens = this.tokenize(s)
        if (this.debug) console.log(`tokenize('${s})`, tokens)
        let propertyMap = {}
        for (let i = 0; i < tokens.length; i++) {
            let propertyName = tokens[i]
            if (! this.allowUnknown && !(propertyName in this.parsers)) {
                throw Error(`Unknown property '${propertyName}' in '${s}'`)
            }
            let propertyArgs = []
            let j
            for (j = i + 1; j < tokens.length; j++) {
                if (tokens[j] === SEPARATOR) break
                propertyArgs.push(tokens[j])
            }
            i = j
            if (propertyName in this.parsers) {
              try {
                propertyArgs = this.parsers[propertyName](propertyArgs)
              } catch (err) {
                console.log(`Parse error in '${s}'`)
                throw err
              }
            }
            propertyMap[propertyName] = propertyArgs
        }
        if (this.debug) console.log(`propertyMap`, propertyMap)
        return propertyMap
    }

    tokenize(s) {
        let tokens = []
        let arr = s.split('')
        let doubleQuoteOpen = false
        let singleQuoteOpen = false
        let buf = []
        let cur = ''
        let flush = () => { tokens.push(buf.join('')); buf = [] }
        let append = () => { buf.push(cur) }
        for (let i = 0; i < arr.length; i++) {
            let prev = i>0 ? arr[i-1] : ''
            cur = arr[i]
            if (cur === "'" && prev != '\\' && !doubleQuoteOpen) {
                if (singleQuoteOpen) flush()
                singleQuoteOpen = !singleQuoteOpen
            } else if (cur === '"' && prev != '\\' && !singleQuoteOpen) {
                if (doubleQuoteOpen) flush()
                doubleQuoteOpen = !doubleQuoteOpen
            } else if (!singleQuoteOpen && !doubleQuoteOpen && cur === SEPARATOR) {
                if (buf.length > 0) flush()
                if (tokens[tokens.length-1] !== SEPARATOR) tokens.push(SEPARATOR)
            } else if (!singleQuoteOpen && !doubleQuoteOpen && cur.match(/\s/)) {
               if (buf.length > 0) flush()
            } else {
                append()
            }
        }
        if (buf.length > 0)
            flush()
        return tokens
    }
}




/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_script_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_script_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_script_js__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_script_js__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_script_js__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6b113db0_hasScoped_false_buble_transforms_template_html__ = __webpack_require__(17);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(15)
}
var normalizeComponent = __webpack_require__(3)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_script_js___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6b113db0_hasScoped_false_buble_transforms_template_html__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/HocrToolbar/index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6b113db0", Component.options)
  } else {
    hotAPI.reload("data-v-6b113db0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'HocrToolbar',
  computed: {
    classList: function classList() {
      return {
        'hocrjs-toolbar': true,
        expanded: this.expanded
      };
    }
  },
  data: function data() {
    return {
      expanded: true
    };
  },

  methods: {
    toggle: function toggle() {
      this.expanded = !this.expanded;
    }
  }

};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * Copyright (c) 2016-2017 Konstantin Baierer
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */

var Utils = function () {
    function Utils() {
        _classCallCheck(this, Utils);
    }

    _createClass(Utils, null, [{
        key: 'removeCssFragment',
        value: function removeCssFragment(styleId, css) {
            var style = document.querySelector('#' + styleId);
            if (style) style.remove();
        }
    }, {
        key: 'addCssFragment',
        value: function addCssFragment(styleId, css) {
            var style = document.querySelector('#' + styleId);
            if (!style) {
                style = document.createElement('style');
                style.id = styleId;
                document.head.appendChild(style);
            }
            style.appendChild(document.createTextNode(css));
        }
    }]);

    return Utils;
}();

exports.default = Utils;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(10);

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(6);

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  HocrViewer: _index2.default,
  HocrToolbar: _index4.default
};

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_script_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_script_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_script_js__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_script_js__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_script_js__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_91d8e7ca_hasScoped_false_buble_transforms_template_html__ = __webpack_require__(27);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(11)
}
var normalizeComponent = __webpack_require__(3)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_script_js___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_91d8e7ca_hasScoped_false_buble_transforms_template_html__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/HocrViewer/index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-91d8e7ca", Component.options)
  } else {
    hotAPI.reload("data-v-91d8e7ca", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(12);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("0cee75f0", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-91d8e7ca\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js!./style.scss", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-91d8e7ca\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js!./style.scss");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "/*\n * Copyright (c) 2016-2017 Konstantin Baierer\n *\n * This software may be modified and distributed under the terms\n * of the MIT license.  See the LICENSE file for details.\n */\n/*\n * Copyright (c) 2016-2017 Konstantin Baierer\n *\n * This software may be modified and distributed under the terms\n * of the MIT license.  See the LICENSE file for details.\n */\n.hocr-viewer.hocr-viewer-toolbar-enabled > .hocr-viewer-container {\n  transform: rotate(0);\n  margin-left: 1em;\n}\n.hocr-viewer .hocr-viewer-container {\n  min-height: 100vh;\n  position: relative !important;\n  -webkit-transform: rotate(0deg);\n  -ms-transform: rotate(0deg);\n  transform: rotate(0deg);\n  /* .transform(scale(0.7)); */\n  /* position: relative !important; */\n}\n.hocr-viewer .hocr-viewer-container > div {\n    overflow: auto;\n}\n.hocr-viewer *[class^=\"ocr\"]:hover::before {\n  display: none;\n}\n.hocr-viewer.hocr-viewer-feature-Layout *[class^=\"ocr\"] {\n  position: fixed;\n  white-space: nowrap;\n  justify-content: left;\n  /* align horizontal */\n  align-items: center;\n  /* align vertical */\n}\n.hocr-viewer.hocr-viewer-feature-Layout.hocr-viewer-feature-Tooltip *[class^=\"ocr\"]:hover::before {\n  display: block;\n  background: white;\n  color: black !important;\n  border: 1px solid black;\n  font-family: monospace;\n  position: absolute;\n  font-size: 12px;\n  font-weight: bold;\n  line-height: 100%;\n  height: 15px;\n  top: -15px;\n}\n.hocr-viewer.hocr-viewer-feature-Highlight {\n  margin: -1px;\n}\n.hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightNotPage *[class^=\"ocr\"]:not(.ocr_page) {\n    border: 3px solid red;\n}\n.hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightNotPage *[class^=\"ocr\"]:not(.ocr_page):hover {\n      background: rgba(255, 153, 153, 0.2);\n}\n.hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightPage .ocr_page {\n    border: 3px solid #8B4513;\n}\n.hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightPage .ocr_page:hover {\n      background: rgba(231, 143, 80, 0.2);\n}\n.hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightInlineNotBlank .ocr_line *[class^=\"ocr\"]:not(.hocrjs-blank) {\n    border: 3px solid green;\n}\n.hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightInlineNotBlank .ocr_line *[class^=\"ocr\"]:not(.hocrjs-blank):hover {\n      background: rgba(26, 255, 26, 0.2);\n}\n.hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightInlineBlank .ocr_line *[class^=\"ocr\"].hocrjs-blank {\n    border: 3px solid #1aff1a;\n}\n.hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightInlineBlank .ocr_line *[class^=\"ocr\"].hocrjs-blank:hover {\n      background: rgba(179, 255, 179, 0.2);\n}\n.hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightLine *[class^=\"ocr\"][class*=\"line\"] {\n    border: 3px solid gold;\n}\n.hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightLine *[class^=\"ocr\"][class*=\"line\"]:hover {\n      background: rgba(255, 239, 153, 0.2);\n}\n.hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightPar .ocr_par {\n    border: 3px solid purple;\n}\n.hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightPar .ocr_par:hover {\n      background: rgba(255, 26, 255, 0.2);\n}\n.hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightCarea .ocr_carea {\n    border: 3px solid blue;\n}\n.hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightCarea .ocr_carea:hover {\n      background: rgba(153, 153, 255, 0.2);\n}\n.hocr-viewer.hocr-viewer-feature-BackgroundImage {\n  background-repeat: no-repeat;\n}\n.hocr-viewer.hocr-viewer-feature-BackgroundImage .ocr_page {\n    background-size: contain;\n}\n.hocr-viewer.hocr-viewer-feature-DisableEmStrong em {\n  font-style: normal;\n}\n.hocr-viewer.hocr-viewer-feature-DisableEmStrong strong {\n  font-weight: normal;\n}\n.hocr-viewer.hocr-viewer-feature-TransparentText .ocr_page {\n  color: transparent;\n}\n", ""]);

// exports


/***/ }),
/* 13 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

const HocrPropertyParser = __webpack_require__(5)

/**
 * ### HocrDOM
 * 
 */

function log(options, ...args) {
  if (!options.debug) return
  console.log('# ', new Date(), ...args)
}

const defaultPropertyParser = new HocrPropertyParser()

class HocrDOM {

  /**
   * #### Options
   * 
   * All boolean options are `false` by default
   * - `{Boolean} debug` Whether to log debug output
   * - `{Boolean} allowUnknown` Whether to silently ignore properties not in the spec
   * - `{Boolean} allowInvalidNumbers` Whether to silently ignore invalid number (wrong type e.g.)
   * - `{Boolean} disableCardinalityChecks` Whether to silently ignore invalid argument cardinality
   * - `{PropertyParser} propertyParser` PropertyParser instance to use. Static parser with default values used otherwise
   * 
   */

  /**
   * #### `HocrDOM.isHocrElement(context, options, cache)`
   * 
   * `true` if this has an `ocr_*` class, `false` otherwise
   * 
   * - `@param {Document|Element}` context Context element
   * - `@param {Object}` options See [Options](#options)
   * - `@param {Object}` cache If provided, will cache the properties in this object with key `_hocr`
   * 
   */
  static isHocrElement(context, options, cache={}) {
    if (cache._isHocrElement === undefined) {
      cache._isHocrElement = !! Array.from(context.classList).find(cls => cls.startsWith('ocr'))
    }
    return cache._isHocrElement
  }

  /**
   * #### `HocrDOM.getHocrProperties(context, options, cache)`
   * 
   * List the properties of this hOCR element as an object
   *
   * - `@param {Document|Element}` context Context element
   * - `@param {Object}` options See [Options](#options)
   * - `@param {Object}` cache If provided, will cache the properties in this object with key `_hocr`
   * 
   */
  static getHocrProperties(context, options={}, cache={}) {
    let {propertyParser} = options
    if (!propertyParser) propertyParser = defaultPropertyParser
    if (!cache._hocr) {
      if (!HocrDOM.isHocrElement(context, options, cache)) {
        cache._hocr = {}
      } else {
        cache._hocr = propertyParser.parse(context.getAttribute('title'))
      }
    }
    return cache._hocr
  }

  /**
   * #### `HocrDOM.queryHocr(context, query, options)`
   * 
   * Find the first hOCR element matching query
   * 
   * See [queryHocrAll](#queryhocrallquery) for options
   * 
   */
  static queryHocr(...args) {
    return Array.from(HocrDOM.queryHocrAll(...args))[0]
  }

  /**
   * #### `HocrDOM.queryHocrAll(context, query, options)`
   * 
   * - `@param {Document|Element}` context Context element
   * - `@param {String|Object}` query Object of query parameters. If a string -> query.class
   *   - `@param {String} query.tag` tag names to look for. Default '*'
   *   - `@param {String} query.title` `title` attribute must contain this string
   *   - `@param {String} query.clauses` String of clauses for querySelector
   *   - `@param {String|Array}` class Elements with this class (if string) or any of these classes (if array)
   *   - `@param {String} query.context` context element to query below. Otherwise root element of DOM.
   *   - `@param {String} query.terminal` Return only hocr-elements containing no hocr-elements themselves
   *   - `@param {String} query.nonTerminal` Opposite of `terminal`
   *   - `@param {String} query.filter` Arbitrary filter to prune resulting element set
   * 
   */
  static queryHocrAll(context, query={}, options={}) {

    if (Array.isArray(query) || typeof query === 'string') query = {class: query}
    query.tag = (query.tag || '*')
    query.clauses = (query.clauses || '')

    // Return only hocr-elements with a bbox
    if (query.title) query.clauses += `[title*="${query.title}"]`

    // Return specific ocr_* / ocrx_* classes
    query.class = (query.class || '')
    if (typeof query.class === 'string') query.class = [query.class]

    // Build querySelectorAll query
    let qs = query.class.map(function(cls) {
      if (cls.indexOf('ocr') === 0) return cls
      if (cls === '') return 'ocr'
      if (cls.indexOf('x_') !== 0) return `ocr_${cls}`
      return `ocr${cls}`
    }).map(function(cls) {
      return `${query.tag}[class^="${cls}"]${query.clauses}`
    }).join(',')

    log(options, "findByOcrClass:", qs)

    // let set = Array.prototype.slice.call(context.querySelectorAll(qs))
    const nodeList = context.querySelectorAll(qs)
    let set = Array.from(nodeList)

    if (query.terminal) {
      set = set.filter(function(el) {
        if (!el.querySelector('*[class^="ocr"]')) return el
      })
    }
    if (query.nonTerminal) {
      set = set.filter(function(el) {
        if (el.querySelector('*[class^="ocr"]')) return el
      })
    }

    // Arbitrary filter function
    if (query.filter) {
      log(options, {query})
      set = set.filter(query.filter)
    }

    return Object.create(set, nodeList.prototype)
  }

  /**
   * #### `HocrDOM.extendPrototypes({Element, Document}, options)`
   * 
   * Extend the prototypes of `Element` and `Document` with hOCR-specific
   * methods and properties.
   *
   * ##### `el.queryHocr(query, options)`
   * 
   * Same as [`HocrDOM.queryHocr`]() but with context set to `el`
   * 
   * ##### `el.queryHocrAll(query, options)`
   * 
   * Same as [`HocrDOM.queryHocrAll`]() but with context set to `el`
   * 
   * ##### `el.isHocrElement`
   * 
   * Property containing whether this is an hOCR element
   * 
   * ##### `el.hocr`
   * 
   * Property containing the hOCR properties
   * 
   */
  static extendPrototypes({Element, Document}, options) {

    ;[Element.prototype, Document.prototype].forEach(p => {
      ;['queryHocr', 'queryHocrAll'].forEach(fn => {
        p[fn] = function (query={}, options) {
          const context = (query.context || this)
          return HocrDOM[fn](context, query, options)
        }
      })

      Object.defineProperty(p, '_hocr', {enumerable: false, writable: true})
      Object.defineProperty(p, 'hocr', {get() {return HocrDOM.getHocrProperties(this, options, this)}})

      Object.defineProperty(p, '_isHocrElement', {enumerable: true, writable: true})
      Object.defineProperty(p, 'isHocrElement', {get() {return HocrDOM.isHocrElement(this, options, this)}})
    })

    HocrDOM._initialized = true
  }


}

module.exports = HocrDOM


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(16);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("199fb537", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6b113db0\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js!./style.scss", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6b113db0\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js!./style.scss");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "\n@charset \"UTF-8\";\n/*\n * Copyright (c) 2016-2017 Konstantin Baierer\n *\n * This software may be modified and distributed under the terms\n * of the MIT license.  See the LICENSE file for details.\n */\n.hocrjs-toolbar {\n  position: fixed;\n  z-index: 1;\n  top: 0;\n  height: 100%;\n  border: none;\n}\n.hocrjs-toolbar .toggler {\n    float: left;\n    position: fixed;\n    left: 0;\n    font-family: monospace;\n    color: white;\n    background: #333;\n    height: 100vh;\n    width: 1em;\n}\n.hocrjs-toolbar .toggler .toggler-inner {\n      font-size: 1.5em;\n      top: 40vh;\n      position: fixed;\n}\n.hocrjs-toolbar .toggler .toggler-hide {\n      display: none;\n}\n.hocrjs-toolbar .toggler .toggler-show {\n      display: block;\n}\n.hocrjs-toolbar .wrapper {\n    position: fixed;\n    margin-left: 1em;\n    background-color: rgba(180, 180, 190, 0.85);\n    overflow: hidden;\n    left: -32em;\n    transition: all 0.5s ease;\n    height: 100vh;\n}\n.hocrjs-toolbar.expanded {\n    border-right: 3px solid #333;\n}\n.hocrjs-toolbar.expanded .wrapper {\n      padding-left: .5em;\n      padding-right: .5em;\n      width: 15em;\n      left: 0;\n}\n.hocrjs-toolbar.expanded .toggler-show {\n      display: none;\n}\n.hocrjs-toolbar.expanded .toggler-hide {\n      display: block;\n}\n.hocrjs-toolbar ul.features {\n    list-style-type: none;\n    padding: 0;\n}\n.hocrjs-toolbar ul.features li {\n      background-color: #ffcccc;\n      margin-bottom: 2px;\n      padding: 5px 0;\n}\n.hocrjs-toolbar ul.features li:before {\n        content: '\\2717   ';\n}\n.hocrjs-toolbar ul.features li.checked {\n        background-color: #ccffcc;\n}\n.hocrjs-toolbar ul.features li.checked:before {\n          content: '\\2713   ';\n}\n.hocrjs-toolbar ul.features li input[type='checkbox'] {\n        display: none;\n}\n.hocrjs-toolbar ul.features li label {\n        width: 100%;\n}\n.hocrjs-toolbar summary {\n    font-size: 120%;\n}\n.hocrjs-toolbar summary span.font {\n      font-size: 100%;\n}\n.hocrjs-toolbar select.font {\n    width: 80%;\n    font-size: 110%;\n}\n", ""]);

// exports


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { class: _vm.classList }, [
    _c("div", { staticClass: "toggler", on: { click: _vm.toggle } }, [
      _vm._m(0),
      _vm._v(" "),
      _vm._m(1)
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "wrapper" }, [
      _c("details", { attrs: { open: "" } }, [
        _c("summary", [_vm._v("Features")]),
        _vm._v(" "),
        _c(
          "ul",
          { staticClass: "features" },
          _vm._l(Object.keys(_vm.$parent.featuresAvailable), function(
            featureName
          ) {
            return !featureName.match(/Highlight[A-Z]/)
              ? _c(
                  "li",
                  {
                    key: featureName,
                    class: {
                      checked: _vm.$parent.isFeatureEnabled(featureName)
                    },
                    on: {
                      click: function($event) {
                        _vm.$parent.toggleFeature(featureName)
                      }
                    }
                  },
                  [_c("label", [_vm._v(_vm._s(featureName))])]
                )
              : _vm._e()
          })
        )
      ]),
      _vm._v(" "),
      _c("details", { attrs: { open: "" } }, [
        _c("summary", [_vm._v("Highlighting")]),
        _vm._v(" "),
        _c(
          "ul",
          { staticClass: "features" },
          _vm._l(Object.keys(_vm.$parent.featuresAvailable), function(
            featureName
          ) {
            return featureName.match(/Highlight[A-Z]/)
              ? _c(
                  "li",
                  {
                    key: featureName,
                    class: {
                      checked: _vm.$parent.isFeatureEnabled(featureName)
                    },
                    on: {
                      click: function($event) {
                        _vm.$parent.toggleFeature(featureName)
                      }
                    }
                  },
                  [
                    _c("input", { attrs: { type: "checkbox" } }),
                    _vm._v(" "),
                    _c("label", [_vm._v(_vm._s(featureName))])
                  ]
                )
              : _vm._e()
          })
        )
      ]),
      _vm._v(" "),
      _c("details", { staticClass: "hocr-toolbar-zoom", attrs: { open: "" } }, [
        _c("summary", [
          _vm._v("Zoom: "),
          _c("span", { staticClass: "zoom" }, [
            _vm._v(_vm._s(_vm.$parent.currentZoomRounded))
          ]),
          _vm._v("%\n      ")
        ]),
        _vm._v(" "),
        _c(
          "button",
          {
            staticClass: "zoom",
            on: {
              click: function($event) {
                _vm.$parent.zoom("-0.1")
              }
            }
          },
          [_vm._v("-")]
        ),
        _vm._v(" "),
        _c("input", {
          attrs: { type: "range", min: "0", max: "5", step: ".02" },
          domProps: { value: _vm.$parent.currentZoom },
          on: {
            change: function($event) {
              _vm.$parent.currentZoom = $event.target.value
            }
          }
        }),
        _vm._v(" "),
        _c(
          "button",
          {
            staticClass: "zoom",
            on: {
              click: function($event) {
                _vm.$parent.zoom("+0.1")
              }
            }
          },
          [_vm._v("+")]
        ),
        _vm._v(" "),
        _c("p", [
          _c(
            "button",
            {
              staticClass: "zoom",
              on: {
                click: function($event) {
                  _vm.$parent.zoom("height")
                }
              }
            },
            [_vm._v("Fit height")]
          ),
          _vm._v(" "),
          _c(
            "button",
            {
              staticClass: "zoom",
              on: {
                click: function($event) {
                  _vm.$parent.zoom("width")
                }
              }
            },
            [_vm._v("Fit width")]
          ),
          _vm._v(" "),
          _c(
            "button",
            {
              staticClass: "zoom",
              on: {
                click: function($event) {
                  _vm.$parent.zoom("reset")
                }
              }
            },
            [_vm._v("100 %")]
          )
        ])
      ]),
      _vm._v(" "),
      _vm.$parent.isFeatureEnabled("Font")
        ? _c("details", { attrs: { open: "" } }, [
            _vm._m(2),
            _vm._v(" "),
            _c(
              "select",
              {
                staticClass: "font",
                on: {
                  change: function($event) {
                    _vm.$parent.fontFamily = $event.target.value
                  }
                }
              },
              _vm._l(_vm.$parent.fontsAvailable, function(
                fontOptions,
                fontName
              ) {
                return _c(
                  "option",
                  {
                    key: fontName,
                    style: { "font-size": "large", "font-family": fontName },
                    domProps: { value: fontName }
                  },
                  [_vm._v("\n          " + _vm._s(fontName) + "\n        ")]
                )
              })
            )
          ])
        : _vm._e()
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "toggler-inner toggler-show" }, [
      _vm._v("\n      >"),
      _c("br"),
      _vm._v(">"),
      _c("br"),
      _vm._v(">"),
      _c("br"),
      _vm._v(">"),
      _c("br"),
      _vm._v(">"),
      _c("br"),
      _vm._v(">"),
      _c("br"),
      _vm._v(">"),
      _c("br"),
      _vm._v(">"),
      _c("br"),
      _vm._v(">"),
      _c("br")
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "toggler-inner toggler-hide" }, [
      _vm._v("\n      <"),
      _c("br"),
      _vm._v("<"),
      _c("br"),
      _vm._v("<"),
      _c("br"),
      _vm._v("<"),
      _c("br"),
      _vm._v("<"),
      _c("br"),
      _vm._v("<"),
      _c("br"),
      _vm._v("<"),
      _c("br"),
      _vm._v("<"),
      _c("br"),
      _vm._v("<"),
      _c("br")
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("summary", [
      _vm._v("Font: "),
      _c("span", { staticClass: "font" })
    ])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-6b113db0", esExports)
  }
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  features: {
    disableEmStrong: { enabled: false },
    contentEditable: { enabled: false },
    tooltips: {
      enabled: true,
      styleId: 'hocr-viewer-tooltip-style'
    },
    transparentText: { enabled: false }
  }
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _BackgroundImage = __webpack_require__(20);

var _BackgroundImage2 = _interopRequireDefault(_BackgroundImage);

var _ContentEditable = __webpack_require__(21);

var _ContentEditable2 = _interopRequireDefault(_ContentEditable);

var _Font = __webpack_require__(22);

var _Font2 = _interopRequireDefault(_Font);

var _HighlightBlank = __webpack_require__(23);

var _HighlightBlank2 = _interopRequireDefault(_HighlightBlank);

var _Layout = __webpack_require__(24);

var _Layout2 = _interopRequireDefault(_Layout);

var _ScaleFont = __webpack_require__(25);

var _ScaleFont2 = _interopRequireDefault(_ScaleFont);

var _Tooltip = __webpack_require__(26);

var _Tooltip2 = _interopRequireDefault(_Tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  BackgroundImage: _BackgroundImage2.default,
  ContentEditable: _ContentEditable2.default,
  Font: _Font2.default,
  HighlightBlank: _HighlightBlank2.default,
  Layout: _Layout2.default,
  ScaleFont: _ScaleFont2.default,
  Tooltip: _Tooltip2.default
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _hocrDom = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BackgroundImage = function () {
  function BackgroundImage(_ref) {
    var _ref$imagePrefix = _ref.imagePrefix,
        imagePrefix = _ref$imagePrefix === undefined ? '' : _ref$imagePrefix;

    _classCallCheck(this, BackgroundImage);

    this.imagePrefix = imagePrefix;
  }

  _createClass(BackgroundImage, [{
    key: 'apply',
    value: function apply(dom) {
      var _this = this;

      var page = _hocrDom.HocrDOM.queryHocr(dom, 'page');
      _hocrDom.HocrDOM.queryHocrAll(dom, {
        title: 'image'
      }).forEach(function (el) {
        var imageFile = _hocrDom.HocrDOM.getHocrProperties(el).image;
        page.style.backgroundImage = 'url(' + _this.imagePrefix + imageFile + ')';
      });
    }
  }]);

  return BackgroundImage;
}();

exports.default = BackgroundImage;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _hocrDom = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ContentEditable = function () {
  function ContentEditable() {
    _classCallCheck(this, ContentEditable);
  }

  _createClass(ContentEditable, [{
    key: '$emit',
    value: function $emit() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      console.log({ args: args });
    }
  }, {
    key: 'apply',
    value: function apply(dom) {
      var _this = this;

      _hocrDom.HocrDOM.queryHocrAll(dom, {
        class: ['line', 'x_word'],
        clauses: ''
      }).forEach(function (el) {
        el.setAttribute('contentEditable', 'true');
        el.addEventListener('input', function () {
          return _this.$emit('contentEdited', el);
        });
      });
    }
  }]);

  return ContentEditable;
}();

exports.default = ContentEditable;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _hocrDom = __webpack_require__(0);

var _utils = __webpack_require__(8);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Font = function () {
  function Font(_ref) {
    var _ref$fontFamily = _ref.fontFamily,
        fontFamily = _ref$fontFamily === undefined ? 'x' : _ref$fontFamily,
        fontsAvailable = _ref.fontsAvailable;

    _classCallCheck(this, Font);

    this.fontFamily = fontFamily;

    var styleId = 'hocr-view-font-styles';
    _utils2.default.removeCssFragment(styleId);
    Object.keys(fontsAvailable).forEach(function (font) {
      var cssUrl = fontsAvailable[font].cssUrl;
      if (cssUrl) _utils2.default.addCssFragment(styleId, '@import "' + cssUrl + '";\n');
    });
  }

  _createClass(Font, [{
    key: 'apply',
    value: function apply(dom) {
      var _this = this;

      _hocrDom.HocrDOM.queryHocrAll(dom).forEach(function (el) {
        el.style.fontFamily = _this.fontFamily;
      });
    }
  }]);

  return Font;
}();

exports.default = Font;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _hocrDom = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HighlightBlank = function () {
  function HighlightBlank() {
    _classCallCheck(this, HighlightBlank);
  }

  _createClass(HighlightBlank, [{
    key: 'apply',
    value: function apply(dom) {
      _hocrDom.HocrDOM.queryHocrAll(dom).forEach(function (el) {
        if (el.innerHTML.trim() === '') el.classList.add('hocrjs-blank');
      });
    }
  }]);

  return HighlightBlank;
}();

exports.default = HighlightBlank;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _hocrDom = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Layout = function () {
  function Layout() {
    _classCallCheck(this, Layout);
  }

  _createClass(Layout, [{
    key: 'apply',
    value: function apply(dom) {
      _hocrDom.HocrDOM.queryHocrAll(dom, {
        title: 'bbox'
      }).forEach(function (el) {
        var _HocrDOM$getHocrPrope = _hocrDom.HocrDOM.getHocrProperties(el),
            bbox = _HocrDOM$getHocrPrope.bbox;

        el.style.position = 'fixed';
        el.style.left = bbox[0] + "px";
        el.style.top = bbox[1] + "px";
        el.style.width = bbox[2] - bbox[0] + "px";
        el.style.height = bbox[3] - bbox[1] + "px";
      });
    }
  }]);

  return Layout;
}();

exports.default = Layout;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _hocrDom = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ScaleFont = function () {
  function ScaleFont(_ref) {
    var _ref$fontFamily = _ref.fontFamily,
        fontFamily = _ref$fontFamily === undefined ? 'x' : _ref$fontFamily,
        _ref$fonts = _ref.fonts,
        fonts = _ref$fonts === undefined ? {} : _ref$fonts;

    _classCallCheck(this, ScaleFont);

    this.fontFamily = fontFamily;
    this.maxFontSize = 128;
    this.minFontSize = 2;
    this.wrapClass = 'hocr-viewer-wrap';
    this.cache = {};
  }

  _createClass(ScaleFont, [{
    key: 'apply',
    value: function apply(dom) {
      var _this = this;

      console.time('toggleScaleFont');

      // wrapper element containing wrappers for font-size expansion
      var wrap = document.createElement('span');
      wrap.classList.add(this.wrapClass);
      document.body.appendChild(wrap);
      _hocrDom.HocrDOM.queryHocrAll(dom, { terminal: true }).forEach(function (el) {
        return _this.scaleFont(el, wrap);
      });
      wrap.remove();

      console.timeEnd('toggleScaleFont');
    }
  }, {
    key: 'scaleFont',
    value: function scaleFont(el, wrap) {
      var text = el.textContent.trim();
      if (text.length === 0) return;
      if (!(text in this.cache)) {
        // wrap.setAttribute('class', el.getAttribute('class'))
        // wrap.style.width = '100%'
        wrap.style.fontFamily = el.style.fontFamily;
        wrap.innerHTML = text;
        var height = parseInt(el.style.height.replace('px', ''));
        var width = parseInt(el.style.width.replace('px', ''));
        var fontSize = Math.min(width, height);
        if (fontSize <= this.minFontSize) {
          this.cache[text] = this.minFontSize;
        } else {
          // console.log({fontSize, width: width, height:height, min, el})
          wrap.style.fontSize = fontSize + 'px';
          if (fontSize > this.minFontSize && wrap.offsetHeight > height) {
            fontSize -= wrap.offsetHeight - height;
            wrap.style.fontSize = fontSize + 'px';
          }
          while (fontSize > this.minFontSize && wrap.offsetWidth > width) {
            wrap.style.fontSize = --fontSize + 'px';
          }
          // if (iterations > 1) console.debug(iterations, text, wrap.offsetHeight, height, wrap.offsetWidth, width)
          this.cache[text] = fontSize - 1;
        }
      }
      el.style.fontSize = this.cache[text] + 'px';
    }
  }]);

  return ScaleFont;
}();

exports.default = ScaleFont;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _hocrDom = __webpack_require__(0);

var _utils = __webpack_require__(8);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ScaleFont = function () {
  function ScaleFont() {
    _classCallCheck(this, ScaleFont);

    this.styleId = 'hocr-viewer-tooltip-style';
  }

  _createClass(ScaleFont, [{
    key: 'apply',
    value: function apply(dom) {
      var ocrClasses = {};
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _hocrDom.HocrDOM.queryHocrAll(dom)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var el = _step.value;

          ocrClasses[el.getAttribute('class')] = true;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      console.log("Detected OCR classes", Object.keys(ocrClasses));

      _utils2.default.removeCssFragment(this.styleId);
      _utils2.default.addCssFragment(this.styleId, Object.keys(ocrClasses).map(function (cls) {
        return '.' + cls + ':hover::before { content: "' + cls + '"; }\n';
      }).join("\n"));
    }
  }]);

  return ScaleFont;
}();

exports.default = ScaleFont;

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { class: _vm.classList },
    [
      _vm.enableToolbar ? _c("hocr-toolbar") : _vm._e(),
      _vm._v(" "),
      _c("div", {
        staticClass: "hocr-viewer-container",
        style: _vm.containerStyle,
        domProps: { innerHTML: _vm._s(_vm.hocrDom.innerHTML) }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-91d8e7ca", esExports)
  }
}

/***/ })
/******/ ]);
});