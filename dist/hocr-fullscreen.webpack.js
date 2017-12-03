/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _viewer = __webpack_require__(1);
	
	window.hocrViewer = new _viewer.HocrViewer({ root: document.querySelector('body') }); /* BEGIN-BANNER -f smmono12 -i ' * ' -C "2016 Konstantin Baierer"  -L MIT
	                                                                                       *   ▄▄      ▗▄▖  ▗▄▖                                       █         █
	                                                                                       *  ▐▛▀      ▝▜▌  ▝▜▌                                       ▀         ▀   ▐▌
	                                                                                       * ▐███ ▐▌ ▐▌ ▐▌   ▐▌  ▗▟██▖ ▟██▖ █▟█▌ ▟█▙  ▟█▙ ▐▙██▖      ██  ▐▙██▖ ██  ▐███
	                                                                                       *  ▐▌  ▐▌ ▐▌ ▐▌   ▐▌  ▐▙▄▖▘▐▛  ▘ █▘  ▐▙▄▟▌▐▙▄▟▌▐▛ ▐▌       █  ▐▛ ▐▌  █   ▐▌
	                                                                                       *  ▐▌  ▐▌ ▐▌ ▐▌   ▐▌   ▀▀█▖▐▌    █   ▐▛▀▀▘▐▛▀▀▘▐▌ ▐▌ ██▌   █  ▐▌ ▐▌  █   ▐▌
	                                                                                       *  ▐▌  ▐▙▄█▌ ▐▙▄  ▐▙▄ ▐▄▄▟▌▝█▄▄▌ █   ▝█▄▄▌▝█▄▄▌▐▌ ▐▌     ▗▄█▄▖▐▌ ▐▌▗▄█▄▖ ▐▙▄
	                                                                                       *  ▝▘   ▀▀▝▘  ▀▀   ▀▀  ▀▀▀  ▝▀▀  ▀    ▝▀▀  ▝▀▀ ▝▘ ▝▘     ▝▀▀▀▘▝▘ ▝▘▝▀▀▀▘  ▀▀
	                                                                                       *
	                                                                                       * Copyright (c) 2016 Konstantin Baierer
	                                                                                       *
	                                                                                       * This software may be modified and distributed under the terms
	                                                                                       * of the MIT license.  See the LICENSE file for details.
	                                                                                       *
	                                                                                      
	                                                                                       * END-BANNER */
	
	window.hocrViewer.init();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.HocrViewer = exports.defaultConfig = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* BEGIN-BANNER -f smmono12 -i ' * ' -C "2016 Konstantin Baierer"  -L MIT
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *        █
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *        ▀
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * ▐▙ ▟▌ ██   ▟█▙ █   █ ▟█▙  █▟█▌
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  █ █   █  ▐▙▄▟▌▜ █ ▛▐▙▄▟▌ █▘
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  ▜▄▛   █  ▐▛▀▀▘▐▙█▟▌▐▛▀▀▘ █
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  ▐█▌ ▗▄█▄▖▝█▄▄▌▝█ █▘▝█▄▄▌ █
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *   ▀  ▝▀▀▀▘ ▝▀▀  ▀ ▀  ▝▀▀  ▀
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2016 Konstantin Baierer
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This software may be modified and distributed under the terms
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * of the MIT license.  See the LICENSE file for details.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * END-BANNER */
	
	
	var _parser = __webpack_require__(2);
	
	var _utils = __webpack_require__(3);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var defaultConfig = exports.defaultConfig = {
	    root: 'body',
	    debugLevel: 1,
	    fonts: {
	        'sans-serif': {},
	        serif: {},
	        monospace: {},
	        UnifrakturCook: {
	            cssUrl: 'https://fonts.googleapis.com/css?family=UnifrakturCook:700'
	        },
	        UnifrakturMaguntia: {
	            cssUrl: 'https://fonts.googleapis.com/css?family=UnifrakturMaguntia'
	        },
	        'Old Standard TT': {
	            cssUrl: 'https://fonts.googleapis.com/css?family=Old+Standard+TT'
	        },
	        Cardo: {
	            cssUrl: 'https://fonts.googleapis.com/css?family=Cardo'
	        },
	        'Noto Serif': {
	            cssUrl: 'https://fonts.googleapis.com/css?family=Noto+Serif:400,400i,700&subset=latin-ext'
	        },
	        'Libre Baskerville': {
	            cssUrl: 'https://fonts.googleapis.com/css?family=Libre+Baskerville:400,400i,700&subset=latin-ext'
	        }
	    },
	    features: {
	        backgroundImage: {
	            enabled: false
	        },
	        scaleFont: {
	            enabled: false,
	            maxFontSize: 128,
	            minFontSize: 2,
	            wrapClass: 'hocr-viewer-wrap'
	        },
	        disableEmStrong: {
	            enabled: false
	        },
	        contentEditable: {
	            enabled: false
	        },
	        tooltips: {
	            enabled: true,
	            styleId: 'hocr-viewer-tooltip-style'
	        },
	        borders: {
	            enabled: true
	        },
	        transparentText: {
	            enabled: false
	        }
	    },
	    expandToolbar: true,
	    enableToolbar: true,
	    transparentText: false,
	    rootClass: 'hocr-viewer',
	    toolbarId: 'hocr-viewer-toolbar'
	};
	
	var HocrViewer = exports.HocrViewer = function () {
	    function HocrViewer(config) {
	        var _this = this;
	
	        _classCallCheck(this, HocrViewer);
	
	        this.config = defaultConfig;
	        Object.keys(config || {}).forEach(function (k) {
	            // TODO proper conifg
	            _this.config[k] = config[k];
	        });
	        this.root = this.config.root;
	        if (typeof this.root === 'string') this.root = document.querySelector(this.root);
	        this.parser = new _parser.HocrParser(this.config);
	        Object.keys(this.config.fonts).forEach(function (font) {
	            var cssUrl = _this.config.fonts[font].cssUrl;
	            if (cssUrl) _utils2.default.addCssFragment('hocr-view-font-styles', '@import "' + cssUrl + '";\n');
	        });
	        this.cache = {
	            scaleFont: {}
	        };
	    }
	
	    _createClass(HocrViewer, [{
	        key: 'log',
	        value: function log() {
	            var level = arguments[0];
	            if (level > this.config.debugLevel) return;
	            var args = Array.prototype.slice.call(arguments, [1]);
	            var levelToFn = ['info', 'debug', 'log'];
	            console[levelToFn[level]].apply(console, args);
	        }
	    }, {
	        key: 'findByOcrClass',
	        value: function findByOcrClass(query) {
	            query = query || {};
	
	            // Expect tag
	            query.tag = query.tag || '*';
	
	            // Arbitrary clauses
	            query.clauses = query.clauses || '';
	
	            // Return only hocr-elements with a bbox
	            if (query.title) query.clauses += '[title*="' + query.title + '"]';
	
	            // Return specific ocr_* / ocrx_* classes
	            query.class = query.class || '';
	            if (typeof query.class === 'string') query.class = [query.class];
	
	            // Build querySelectorAll query
	            var qs = query.class.map(function (cls) {
	                if (cls.indexOf('ocr') === 0) return cls;
	                if (cls === '') return 'ocr';
	                if (cls.indexOf('x_') !== 0) return 'ocr_' + cls;
	                return 'ocr' + cls;
	            }).map(function (cls) {
	                return ':scope ' + query.tag + '[class^="' + cls + '"]' + query.clauses;
	            }).join(',');
	            this.log(1, "findByOcrClass:", qs);
	            var context = query.context || document.querySelector('.' + this.config.rootClass);
	            var set = Array.prototype.slice.call(context.querySelectorAll(qs));
	
	            // terminal: Return only hocr-elements containing no hocr-elements themselves
	            // container: Opposite
	            if (query.terminal) set = set.filter(function (el) {
	                if (!el.querySelector('*[class^="ocr"]')) return el;
	            });
	            if (query.container) set = set.filter(function (el) {
	                if (el.querySelector('*[class^="ocr"]')) return el;
	            });
	
	            // Arbitrary filter function
	            if (query.filter) {
	                set = set.filter(query.filter);
	            }
	
	            return set;
	        }
	    }, {
	        key: 'placeOcrElements',
	        value: function placeOcrElements() {
	            var _this2 = this;
	
	            this.findByOcrClass({
	                title: 'bbox'
	            }).forEach(function (el) {
	                var coords = _this2.parser.bbox(el);
	                el.style.left = coords[0] + "px";
	                el.style.top = coords[1] + "px";
	                el.style.width = coords[2] - coords[0] + "px";
	                el.style.height = coords[3] - coords[1] + "px";
	            });
	            var coords = this.parser.bbox(document.querySelector('.ocr_page'));
	            document.querySelector('body').style.minHeight = coords[2] + 'px';
	        }
	    }, {
	        key: 'toggleScaleFont',
	        value: function toggleScaleFont(onoff) {
	            var _this3 = this;
	
	            // wrapper element containing wrappers for font-size expansion
	            console.time('toggleScaleFont');
	            var wrap = document.querySelector('.' + this.config.features.scaleFont.wrapClass);
	            if (!wrap) {
	                wrap = document.createElement('span');
	                wrap.classList.add(this.config.features.scaleFont.wrapClass);
	                this.root.appendChild(wrap);
	            }
	            if (onoff) {
	                this.findByOcrClass({ terminal: true }).forEach(function (el) {
	                    return _this3.scaleFont(el, wrap);
	                });
	                // wrap.style.display = 'none';
	            } else {
	                this.findByOcrClass({ terminal: true }).forEach(function (el) {
	                    return el.style.fontSize = 'initial';
	                });
	            }
	            console.timeEnd('toggleScaleFont');
	        }
	    }, {
	        key: 'scaleFont',
	        value: function scaleFont(el, wrap) {
	            if (el.textContent.trim().length === 0) return;
	            if (!(el.textContent in this.cache.scaleFont)) {
	                // wrap.setAttribute('class', el.getAttribute('class'));
	                // wrap.style.width = '100%';
	                wrap.style.fontFamily = el.style.fontFamily;
	                wrap.innerHTML = el.textContent;
	                var w = 'offsetWidth';
	                var h = 'offsetHeight';
	                var fontsize = Math.min(el[w], el[h]);
	                var min = this.config.features.scaleFont.minFontSize;
	                wrap.style.fontSize = fontsize + 'px';
	                if (fontsize > min && wrap[h] > el[h]) {
	                    fontsize -= wrap[h] - el[h];
	                    wrap.style.fontSize = fontsize + 'px';
	                }
	                while (fontsize > min && wrap[w] > el[w]) {
	                    fontsize -= 1;
	                    wrap.style.fontSize = fontsize + 'px';
	                }
	                // if (iterations > 1) console.debug(iterations, el.textContent, wrap[h], el[h], wrap[w], el[w]);
	                this.cache.scaleFont[el.textContent] = fontsize;
	            }
	            el.style.fontSize = this.cache.scaleFont[el.textContent] + 'px';
	        }
	    }, {
	        key: 'toggleTooltips',
	        value: function toggleTooltips(onoff) {
	            var _this4 = this;
	
	            var style = document.querySelector('#' + this.config.features.tooltips.styleId);
	            if (!onoff) {
	                if (style) style.remove();
	            } else {
	                var ocrClasses = {};
	                var _iteratorNormalCompletion = true;
	                var _didIteratorError = false;
	                var _iteratorError = undefined;
	
	                try {
	                    for (var _iterator = this.findByOcrClass()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
	
	                this.log(0, "Detected OCR classes", Object.keys(ocrClasses));
	                if (!style) {
	                    style = document.createElement('style');
	                    style.setAttribute('id', this.config.features.tooltips.styleId);
	                }
	                style.appendChild(document.createTextNode(Object.keys(ocrClasses).map(function (cls) {
	                    return '.' + _this4.config.rootClass + ' .' + cls + ':hover::before { content: "' + cls + '"; }\n';
	                }).join("\n")));
	                document.head.appendChild(style);
	            }
	        }
	    }, {
	        key: 'toggleBackgroundImage',
	        value: function toggleBackgroundImage(onoff) {
	            var _this5 = this;
	
	            var page = this.root.querySelector('.ocr_page');
	            if (onoff) {
	                this.findByOcrClass({
	                    title: 'image'
	                }).forEach(function (el) {
	                    var imageFile = _this5.parser.image(el);
	                    page.style.backgroundImage = 'url(' + imageFile + ')';
	                });
	            } else {
	                page.style.backgroundImage = '';
	                // delete this.root.style.backgroundImage;
	            }
	        }
	    }, {
	        key: 'toggleContentEditable',
	        value: function toggleContentEditable(onoff) {
	            var _this6 = this;
	
	            var onContentEditableInput = function onContentEditableInput(ev) {
	                console.warn("Scaling of contentEditable is broken right now");
	                if (_this6.config.features.scaleFont.enabled) {
	                    _this6.scaleFont(ev.target);
	                    _this6.findByOcrClass({
	                        context: ev.target
	                    }).forEach(function (child) {
	                        _this6.scaleFont(child);
	                    });
	                }
	            };
	            this.findByOcrClass({
	                class: ['line', 'x_word'],
	                clauses: ''
	            }).forEach(function (el) {
	                if (onoff) {
	                    el.setAttribute('contentEditable', 'true');
	                    el.addEventListener('input', onContentEditableInput);
	                } else {
	                    el.removeAttribute('contentEditable');
	                    el.removeEventListener('input', onContentEditableInput);
	                }
	            });
	        }
	    }, {
	        key: 'toggleExpandToolbar',
	        value: function toggleExpandToolbar(onoff) {
	            this.toolbar.classList.toggle('expanded', onoff);
	        }
	    }, {
	        key: 'toggleFeature',
	        value: function toggleFeature(feature, onoff) {
	            this.root.classList.toggle('feature-' + feature, onoff);
	            var toggle = 'toggle' + feature.substr(0, 1).toUpperCase() + feature.substring(1);
	            if (toggle in this) {
	                this.log(0, 'Calling this.' + toggle);
	                this[toggle](onoff);
	            }
	        }
	    }, {
	        key: 'addToolbar',
	        value: function addToolbar() {
	            var _this7 = this;
	
	            this.toolbar = document.querySelector('#' + this.config.toolbarId);
	            if (this.toolbar) return;
	            this.toolbar = document.createElement('div');
	            this.toolbar.setAttribute('id', this.config.toolbarId);
	            this.toolbar.classList.toggle('expanded', this.config.expandToolbar);
	            document.body.appendChild(this.toolbar);
	            this.toolbar.innerHTML = '\n    <div class="toggler">\n        <div class="toggler-inner toggler-show">\n            &gt;<br/>&gt;<br/>&gt;<br/>&gt;<br/>&gt;<br/>&gt;<br/>&gt;<br/>&gt;<br/>&gt;<br/>\n        </div>\n        <div class="toggler-inner toggler-hide">\n            &lt;<br/>&lt;<br/>&lt;<br/>&lt;<br/>&lt;<br/>&lt;<br/>&lt;<br/>&lt;<br/>&lt;<br/>\n        </div>\n    </div>\n    <div class="wrapper">\n        <h2>Font</h2>\n        <select class="fontlist"></select>\n        <h2>Features</h2>\n        <ul class=\'features\'>\n        </ul>\n        <h2>Zoom</h2>\n        <input type=\'range\' class=\'zoom\' min=\'0\' max=\'500\' step=\'2\' value="100"/>\n    </div>';
	            this.toolbar.querySelector('.toggler').addEventListener('click', function (ev) {
	                _this7.config.expandToolbar = !_this7.config.expandToolbar;
	                _this7.toggleExpandToolbar(_this7.config.expandToolbar);
	            });
	
	            // fonts
	            var fontSelect = this.toolbar.querySelector('select.fontlist');
	            console.log(fontSelect);
	            Object.keys(this.config.fonts).forEach(function (font) {
	                var fontOption = document.createElement('option');
	                fontOption.innerHTML = font;
	                fontOption.style.fontSize = 'large';
	                fontOption.style.fontFamily = font;
	                fontSelect.appendChild(fontOption);
	            });
	            fontSelect.addEventListener('change', function (ev) {
	                var selectedFont = ev.target.options[ev.target.selectedIndex].innerHTML;
	                _this7.findByOcrClass().forEach(function (el) {
	                    el.style.fontFamily = selectedFont;
	                });
	                _this7.onConfigChange();
	            });
	
	            // features
	            Object.keys(this.config.features).forEach(function (feature) {
	                var li = document.createElement('li');
	                var checkbox = document.createElement('input');
	                var label = document.createElement('label');
	                li.appendChild(checkbox);
	                li.appendChild(label);
	                _this7.toolbar.querySelector('.features').appendChild(li);
	
	                label.innerHTML = feature;
	
	                checkbox.setAttribute('type', 'checkbox');
	                checkbox.checked = _this7.config.features[feature].enabled;
	                li.classList.toggle('checked', checkbox.checked);
	                var onChange = function onChange(ev) {
	                    li.classList.toggle('checked', checkbox.checked);
	                    _this7.config.features[feature].enabled = checkbox.checked;
	                    _this7.toggleFeature(feature, checkbox.checked);
	                };
	                li.addEventListener('click', function (ev) {
	                    checkbox.checked = !checkbox.checked;
	                    // onChange();
	                    li.classList.toggle('checked');
	                    _this7.config.features[feature].enabled = checkbox.checked;
	                    _this7.toggleFeature(feature, checkbox.checked);
	                });
	                checkbox.addEventListener('change', onChange);
	            });
	
	            // Zoom
	            var zoomSlider = this.toolbar.querySelector('.zoom');
	            zoomSlider.addEventListener('input', function (ev) {
	                var scaleFactor = ev.target.value / 100.0;
	                var page = _this7.root.querySelector('.ocr_page');
	                page.style.transform = 'scale(' + scaleFactor + ')';
	                page.style.transformOrigin = 'top left';
	                // console.log();
	            });
	        }
	    }, {
	        key: 'onConfigChange',
	        value: function onConfigChange() {
	            var _this8 = this;
	
	            Object.keys(this.config.features).forEach(function (feature) {
	                _this8.toggleFeature(feature, _this8.config.features[feature].enabled);
	            });
	        }
	    }, {
	        key: 'init',
	        value: function init() {
	            var _this9 = this;
	
	            this.root.classList.add(this.config.rootClass);
	
	            if (this.config.enableToolbar) {
	                this.addToolbar();
	            }
	
	            // place the elements on the page
	            this.placeOcrElements();
	
	            // Events
	            this.onConfigChange();
	            window.addEventListener('resize', function () {
	                return _this9.onConfigChange();
	            });
	        }
	    }]);

	    return HocrViewer;
	}();

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/* BEGIN-BANNER -f smmono12 -i ' * ' -C "2016 Konstantin Baierer"  -L MIT
	 * ▐▙█▙  ▟██▖ █▟█▌▗▟██▖ ▟█▙  █▟█▌
	 * ▐▛ ▜▌ ▘▄▟▌ █▘  ▐▙▄▖▘▐▙▄▟▌ █▘
	 * ▐▌ ▐▌▗█▀▜▌ █    ▀▀█▖▐▛▀▀▘ █
	 * ▐█▄█▘▐▙▄█▌ █   ▐▄▄▟▌▝█▄▄▌ █
	 * ▐▌▀▘  ▀▀▝▘ ▀    ▀▀▀  ▝▀▀  ▀
	 * ▐▌
	 *
	 * Copyright (c) 2016 Konstantin Baierer
	 *
	 * This software may be modified and distributed under the terms
	 * of the MIT license.  See the LICENSE file for details.
	 *
	
	 * END-BANNER */
	
	var HocrParser = exports.HocrParser = function () {
	    function HocrParser() {
	        _classCallCheck(this, HocrParser);
	    }
	
	    _createClass(HocrParser, [{
	        key: 'parseTitle',
	        value: function parseTitle(s) {
	            s = this._titleString(s);
	            var prev = '';
	            for (var i = 0; i < s.length; i++) {}
	        }
	    }, {
	        key: 'bbox',
	        value: function bbox(s) {
	            return this._titleString(s).match(/bbox\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/).slice(1).map(function (coord) {
	                return parseInt(coord);
	            });
	        }
	    }, {
	        key: 'image',
	        value: function image(s) {
	            return this._titleString(s).match(/image\s+"([^"]+)"/)[1];
	        }
	
	        /* --------------- *
	         * Private methods *
	         * --------------- */
	
	    }, {
	        key: '_titleString',
	        value: function _titleString(s) {
	            if (typeof s === 'string') return s;
	            return s.getAttribute('title');
	        }
	    }]);
	
	    return HocrParser;
	}();
	
	// export { PropertyMapParser, HocrParser };

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/* BEGIN-BANNER -f smmono12 -i ' * ' -C "2016 Konstantin Baierer"  -L MIT
	 *             █  ▗▄▖
	 *       ▐▌    ▀  ▝▜▌
	 * ▐▌ ▐▌▐███  ██   ▐▌  ▗▟██▖
	 * ▐▌ ▐▌ ▐▌    █   ▐▌  ▐▙▄▖▘
	 * ▐▌ ▐▌ ▐▌    █   ▐▌   ▀▀█▖
	 * ▐▙▄█▌ ▐▙▄ ▗▄█▄▖ ▐▙▄ ▐▄▄▟▌
	 *  ▀▀▝▘  ▀▀ ▝▀▀▀▘  ▀▀  ▀▀▀
	 *
	 * Copyright (c) 2016 Konstantin Baierer
	 *
	 * This software may be modified and distributed under the terms
	 * of the MIT license.  See the LICENSE file for details.
	 *
	
	 * END-BANNER */
	var Utils = function () {
	    function Utils() {
	        _classCallCheck(this, Utils);
	    }
	
	    _createClass(Utils, null, [{
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

/***/ })
/******/ ]);
//# sourceMappingURL=hocr-fullscreen.webpack.js.map