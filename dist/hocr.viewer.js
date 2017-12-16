/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const HocrDOM = __webpack_require__(8);
const HocrPropertyParser = __webpack_require__(3);

module.exports = { HocrDOM, HocrPropertyParser };

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
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(5);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/**
 * ### PropertyParser
 * 
 */

const SEPARATOR = ';';

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
    constructor(opts = {}) {
        Object.assign(this, {
            debug: false,
            allowUnknown: false,
            allowInvalidNumbers: false,
            disableCardinalityChecks: false
        }, opts);
        this.parsers = {
            'baseline': this.numberParser([parseFloat, parseInt]),
            'bbox': this.numberParser(parseInt, { min: 0 }, { length: 4 }),
            'cflow': this.stringParser({ collapse: true }),
            'cuts': args => {
                return args.map(arg => {
                    return this.numberParser(parseInt)(arg.split(','));
                });
            },
            'hardbreak': this.booleanParser({ collapse: true }),
            'image': this.stringParser({ collapse: true }),
            'imagemd5': this.stringParser({ collapse: true }),
            'lpageno': this.stringParser({ collapse: true }),
            'ppageno': this.numberParser(parseInt, { min: 0 }, { collapse: true }),
            'nlp': this.numberParser(parseFloat, { min: 0, max: 100 }),
            'order': this.numberParser(parseInt, { min: 0 }, { collapse: true }),
            'poly': this.numberParser(parseInt, { min: 0 }, { minLength: 4, modulo: 2 }),
            'scan_res': this.numberParser(parseInt, { min: 0 }),
            'textangle': this.numberParser(parseFloat, {}, { collapse: true }),
            'x_bboxes': this.numberParser(parseInt, { min: 0 }),
            'x_font': this.stringParser({ collapse: true }),
            'x_fsize': this.numberParser(parseInt, { min: 0 }),
            'x_confs': this.numberParser(parseFloat, { min: 0, max: 100 }),
            'x_scanner': this.stringParser(),
            'x_source': this.stringParser(),
            'x_wconf': this.numberParser(parseFloat, { min: 0, max: 100 })
        };
    }

    checkCardinality(args, {
        length = -1,
        modulo = -1,
        collapse = false,
        minLength = 0,
        maxLength = Number.MAX_VALUE
    }) {
        if (this.disableCardinalityChecks) {
            return args;
        }
        if (collapse) length = 1;
        if (length > -1 && args.length != length) throw Error(`Incorrect number of arguments (${args.length} != ${length})`);
        if (modulo > -1 && length % modulo > 0) throw Error(`Number of arguments not a multiple of ${modulo} (${args.length})`);
        if (collapse) return args[0];
        if (args.length < minLength) throw Error(`Not enough arguments (${args.length} < ${minLength})`);
        if (args.length > maxLength) throw Error(`Too many arguments (${args.length} > ${minLength})`);
        return args;
    }

    booleanParser(cardinality = {}) {
        return args => {
            return this.checkCardinality(args.map(arg => {
                return Boolean.valueOf()(arg);
            }), cardinality);
        };
    }

    stringParser(cardinality = {}) {
        return args => {
            return this.checkCardinality(args, cardinality);
        };
    }

    numberParser(fns, {
        min = -Number.MAX_VALUE,
        max = Number.MAX_VALUE
    } = {}, cardinality = {}) {
        if (!Array.isArray(fns)) fns = [fns];
        return args => {
            let i = 0;
            return this.checkCardinality(args.map(arg => {
                let parsed = fns[i++ % fns.length](arg);
                if (!this.allowInvalidNumbers) {
                    if (Number.isNaN(parsed)) throw Error(`Not a number: '${arg}'`);else if (parsed < min || parsed > max) throw Error(`Not in range [${min}..${max}]: '${arg}'`);
                }
                return parsed;
            }), cardinality);
        };
    }

    /**
     * #### `parse(str)`
     * 
     * Tokenize and Parse the hOCR properties in a title string
     * 
     */
    parse(s) {
        let tokens = this.tokenize(s);
        if (this.debug) console.log(`tokenize('${s})`, tokens);
        let propertyMap = {};
        for (let i = 0; i < tokens.length; i++) {
            let propertyName = tokens[i];
            if (!this.allowUnknown && !(propertyName in this.parsers)) {
                throw Error(`Unknown property '${propertyName}' in '${s}'`);
            }
            let propertyArgs = [];
            let j;
            for (j = i + 1; j < tokens.length; j++) {
                if (tokens[j] === SEPARATOR) break;
                propertyArgs.push(tokens[j]);
            }
            i = j;
            if (propertyName in this.parsers) {
                try {
                    propertyArgs = this.parsers[propertyName](propertyArgs);
                } catch (err) {
                    console.log(`Parse error in '${s}'`);
                    throw err;
                }
            }
            propertyMap[propertyName] = propertyArgs;
        }
        if (this.debug) console.log(`propertyMap`, propertyMap);
        return propertyMap;
    }

    tokenize(s) {
        let tokens = [];
        let arr = s.split('');
        let doubleQuoteOpen = false;
        let singleQuoteOpen = false;
        let buf = [];
        let cur = '';
        let flush = () => {
            tokens.push(buf.join(''));buf = [];
        };
        let append = () => {
            buf.push(cur);
        };
        for (let i = 0; i < arr.length; i++) {
            let prev = i > 0 ? arr[i - 1] : '';
            cur = arr[i];
            if (cur === "'" && prev != '\\' && !doubleQuoteOpen) {
                if (singleQuoteOpen) flush();
                singleQuoteOpen = !singleQuoteOpen;
            } else if (cur === '"' && prev != '\\' && !singleQuoteOpen) {
                if (doubleQuoteOpen) flush();
                doubleQuoteOpen = !doubleQuoteOpen;
            } else if (!singleQuoteOpen && !doubleQuoteOpen && cur === SEPARATOR) {
                if (buf.length > 0) flush();
                if (tokens[tokens.length - 1] !== SEPARATOR) tokens.push(SEPARATOR);
            } else if (!singleQuoteOpen && !doubleQuoteOpen && cur.match(/\s/)) {
                if (buf.length > 0) flush();
            } else {
                append();
            }
        }
        if (buf.length > 0) flush();
        return tokens;
    }
};

/***/ }),
/* 4 */
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
/* 5 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// import {HocrDOM} from 'hocr-dom'
// const {Document, Element} = window
// HocrDOM.extendPrototypes({Document, Element})

// import './hocr-viewer.scss'

module.exports = __webpack_require__(7);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hocrDom = __webpack_require__(0);

var _hocrToolbar = __webpack_require__(9);

var _hocrToolbar2 = _interopRequireDefault(_hocrToolbar);

var _state = __webpack_require__(14);

var _state2 = _interopRequireDefault(_state);

var _hocrViewer = __webpack_require__(15);

var _hocrViewer2 = _interopRequireDefault(_hocrViewer);

var _hocrViewer3 = __webpack_require__(16);

var _hocrViewer4 = _interopRequireDefault(_hocrViewer3);

var _feature = __webpack_require__(18);

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
  components: { HocrToolbar: _hocrToolbar2.default },
  style: _hocrViewer4.default,
  template: _hocrViewer2.default,
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
    featureHighlightNotPage: { type: Boolean, default: false },
    featureHighlightInline: { type: Boolean, default: false },
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
    featuresAvailable: function featuresAvailable() {
      var ret = {};
      Object.assign(ret, _feature2.default);
      Object.keys(this.$props).filter(function (k) {
        return k.startsWith('feature');
      }).map(function (k) {
        return k.replace('feature', '');
      }).map(function (k) {
        if (!(k in ret)) ret[k] = true;
      });
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
  mounted: function mounted() {
    console.log("enter mounted");
    // // Events
    // this.onConfigChange()
    // window.addEventListener('resize', () => this.onConfigChange())
    console.log("exit mounted");
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

      var _HocrDOM$getHocrPrope = _hocrDom.HocrDOM.getHocrProperties(_hocrDom.HocrDOM.queryHocr(container)),
          bbox = _HocrDOM$getHocrPrope.bbox;

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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

const HocrPropertyParser = __webpack_require__(3);

/**
 * ### HocrDOM
 * 
 */

function log(options, ...args) {
  if (!options.debug) return;
  console.log('# ', new Date(), ...args);
}

const defaultPropertyParser = new HocrPropertyParser();

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
  static isHocrElement(context, options, cache = {}) {
    if (cache._isHocrElement === undefined) {
      cache._isHocrElement = !!Array.from(context.classList).find(cls => cls.startsWith('ocr'));
    }
    return cache._isHocrElement;
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
  static getHocrProperties(context, options = {}, cache = {}) {
    let { propertyParser } = options;
    if (!propertyParser) propertyParser = defaultPropertyParser;
    if (!cache._hocr) {
      if (!HocrDOM.isHocrElement(context, options, cache)) {
        cache._hocr = {};
      } else {
        cache._hocr = propertyParser.parse(context.getAttribute('title'));
      }
    }
    return cache._hocr;
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
    return Array.from(HocrDOM.queryHocrAll(...args))[0];
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
  static queryHocrAll(context, query = {}, options = {}) {

    if (Array.isArray(query) || typeof query === 'string') query = { class: query };
    query.tag = query.tag || '*';
    query.clauses = query.clauses || '';

    // Return only hocr-elements with a bbox
    if (query.title) query.clauses += `[title*="${query.title}"]`;

    // Return specific ocr_* / ocrx_* classes
    query.class = query.class || '';
    if (typeof query.class === 'string') query.class = [query.class];

    // Build querySelectorAll query
    let qs = query.class.map(function (cls) {
      if (cls.indexOf('ocr') === 0) return cls;
      if (cls === '') return 'ocr';
      if (cls.indexOf('x_') !== 0) return `ocr_${cls}`;
      return `ocr${cls}`;
    }).map(function (cls) {
      return `${query.tag}[class^="${cls}"]${query.clauses}`;
    }).join(',');

    log(options, "findByOcrClass:", qs);

    // let set = Array.prototype.slice.call(context.querySelectorAll(qs))
    const nodeList = context.querySelectorAll(qs);
    let set = Array.from(nodeList);

    if (query.terminal) {
      set = set.filter(function (el) {
        if (!el.querySelector('*[class^="ocr"]')) return el;
      });
    }
    if (query.nonTerminal) {
      set = set.filter(function (el) {
        if (el.querySelector('*[class^="ocr"]')) return el;
      });
    }

    // Arbitrary filter function
    if (query.filter) {
      log(options, { query });
      set = set.filter(query.filter);
    }

    return Object.create(set, nodeList.prototype);
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
  static extendPrototypes({ Element, Document }, options) {

    ;[Element.prototype, Document.prototype].forEach(p => {
      ;['queryHocr', 'queryHocrAll'].forEach(fn => {
        p[fn] = function (query = {}, options) {
          const context = query.context || this;
          return HocrDOM[fn](context, query, options);
        };
      });

      Object.defineProperty(p, '_hocr', { enumerable: false, writable: true });
      Object.defineProperty(p, 'hocr', { get() {
          return HocrDOM.getHocrProperties(this, options, this);
        } });

      Object.defineProperty(p, '_isHocrElement', { enumerable: true, writable: true });
      Object.defineProperty(p, 'isHocrElement', { get() {
          return HocrDOM.isHocrElement(this, options, this);
        } });
    });

    HocrDOM._initialized = true;
  }

}

module.exports = HocrDOM;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(10);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hocrToolbar = __webpack_require__(11);

var _hocrToolbar2 = _interopRequireDefault(_hocrToolbar);

var _hocrToolbar3 = __webpack_require__(13);

var _hocrToolbar4 = _interopRequireDefault(_hocrToolbar3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'HocrToolbar',
  template: _hocrToolbar4.default,
  style: _hocrToolbar2.default,
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(12);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js?sourcemap=true!../../../node_modules/sass-loader/lib/loader.js?sourcemap-=true!./hocr-toolbar.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js?sourcemap=true!../../../node_modules/sass-loader/lib/loader.js?sourcemap-=true!./hocr-toolbar.scss");
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
exports.push([module.i, "@charset \"UTF-8\";\n/*\n * Copyright (c) 2016-2017 Konstantin Baierer\n *\n * This software may be modified and distributed under the terms\n * of the MIT license.  See the LICENSE file for details.\n */\n.hocrjs-toolbar {\n  position: fixed;\n  z-index: 1;\n  top: 0;\n  height: 100%;\n  border: none; }\n  .hocrjs-toolbar .toggler {\n    float: left;\n    font-family: monospace;\n    color: white;\n    background: #333;\n    height: 100vh;\n    width: 1em; }\n    .hocrjs-toolbar .toggler .toggler-inner {\n      font-size: 1.5em;\n      top: 40vh;\n      position: fixed; }\n    .hocrjs-toolbar .toggler .toggler-hide {\n      display: none; }\n    .hocrjs-toolbar .toggler .toggler-show {\n      display: block; }\n  .hocrjs-toolbar .wrapper {\n    position: fixed;\n    margin-left: 1em;\n    background-color: rgba(180, 180, 190, 0.85);\n    overflow: hidden;\n    left: -16em;\n    transition: all 0.5s ease;\n    height: 100vh; }\n  .hocrjs-toolbar.expanded {\n    border-right: 3px solid #333; }\n    .hocrjs-toolbar.expanded .wrapper {\n      padding-left: 1em;\n      width: 15em;\n      left: 0; }\n    .hocrjs-toolbar.expanded .toggler-show {\n      display: none; }\n    .hocrjs-toolbar.expanded .toggler-hide {\n      display: block; }\n  .hocrjs-toolbar ul.features {\n    list-style-type: none;\n    padding: 0; }\n    .hocrjs-toolbar ul.features li {\n      background-color: #ffcccc;\n      margin-bottom: 2px;\n      padding: 5px 0; }\n      .hocrjs-toolbar ul.features li:before {\n        content: '\\2717   '; }\n      .hocrjs-toolbar ul.features li.checked {\n        background-color: #ccffcc; }\n        .hocrjs-toolbar ul.features li.checked:before {\n          content: '\\2713   '; }\n      .hocrjs-toolbar ul.features li input[type='checkbox'] {\n        display: none; }\n      .hocrjs-toolbar ul.features li label {\n        width: 100%; }\n  .hocrjs-toolbar summary {\n    font-size: 120%; }\n    .hocrjs-toolbar summary span.font {\n      font-size: 100%; }\n  .hocrjs-toolbar select.font {\n    width: 80%;\n    font-size: 110%; }\n", ""]);

// exports


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = "<div :class=\"classList\">\n  <div class=\"toggler\"\n    @click=\"toggle\"\n    >\n    <div class=\"toggler-inner toggler-show\">\n      &gt;<br/>&gt;<br/>&gt;<br/>&gt;<br/>&gt;<br/>&gt;<br/>&gt;<br/>&gt;<br/>&gt;<br/>\n    </div>\n    <div class=\"toggler-inner toggler-hide\">\n      &lt;<br/>&lt;<br/>&lt;<br/>&lt;<br/>&lt;<br/>&lt;<br/>&lt;<br/>&lt;<br/>&lt;<br/>\n    </div>\n  </div>\n  <div class=\"wrapper\">\n\n    <details open>\n      <summary>Features</summary>\n      <ul class=\"features\">\n        <li v-for=\"featureName in Object.keys($parent.featuresAvailable)\" :key=\"featureName\"\n          @click=\"$parent.toggleFeature(featureName)\"\n          :class=\"{checked: $parent.isFeatureEnabled(featureName)}\"\n          >\n          <input type=\"checkbox\" />\n          <label>{{ featureName }}</label>\n        </li>\n      </ul>\n    </details>\n\n    <details class=\"hocr-toolbar-zoom\" open>\n      <summary>Zoom: <span class=\"zoom\">{{ $parent.currentZoomRounded }}</span>%\n      </summary>\n      <button class=\"zoom\" @click=\"$parent.zoom('-0.1')\">-</button>\n      <input type=\"range\" min=\"0\" max=\"5\" step=\".02\"\n        :value=\"$parent.currentZoom\"\n        @change=\"$parent.currentZoom = $event.target.value\"\n      />\n      <button class=\"zoom\" @click=\"$parent.zoom('+0.1')\">+</button>\n      <p>\n        <button class=\"zoom\" @click=\"$parent.zoom('height')\">Fit height</button>\n        <button class=\"zoom\" @click=\"$parent.zoom('width')\">Fit width</button>\n        <button class=\"zoom\" @click=\"$parent.zoom('reset')\">100 %</button>\n      </p>\n    </details>\n\n\n    <details v-if=\"$parent.isFeatureEnabled('Font')\"\n      open>\n      <summary>Font: <span class=\"font\"></span></summary>\n      <select class=\"font\"\n        @change=\"$parent.fontFamily = $event.target.value\"\n        >\n        <option v-for=\"(fontOptions, fontName) in $parent.fontsAvailable\" :key=\"fontName\"\n          :style=\"{'font-size': 'large', 'font-family': fontName}\"\n          :value=\"fontName\"\n          >\n          {{ fontName }}\n        </option>\n      </select>\n    </details>\n\n  </div>\n</div>\n\n";

/***/ }),
/* 14 */
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
/* 15 */
/***/ (function(module, exports) {

module.exports = "<div :class=\"classList\">\n  <hocr-toolbar v-if=\"enableToolbar\"/>\n  <div v-html=\"hocrDom.innerHTML\"\n    class=\"hocr-viewer-container\"\n    :style=\"{transform: `scale(${currentZoom})`, 'transform-origin': 'top left'}\"\n    >\n  </div>\n</div>\n\n";

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(17);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js?sourcemap=true!../../../node_modules/sass-loader/lib/loader.js?sourcemap-=true!./hocr-viewer.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js?sourcemap=true!../../../node_modules/sass-loader/lib/loader.js?sourcemap-=true!./hocr-viewer.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "/*\n * Copyright (c) 2016-2017 Konstantin Baierer\n *\n * This software may be modified and distributed under the terms\n * of the MIT license.  See the LICENSE file for details.\n */\n/*\n * Copyright (c) 2016-2017 Konstantin Baierer\n *\n * This software may be modified and distributed under the terms\n * of the MIT license.  See the LICENSE file for details.\n */\n.hocr-viewer.hocr-viewer-toolbar-enabled > .hocr-viewer-container {\n  transform: rotate(0);\n  margin-left: 1em; }\n\n.hocr-viewer .hocr-viewer-container {\n  height: 100vh;\n  position: relative !important;\n  -webkit-transform: rotate(0deg);\n  -ms-transform: rotate(0deg);\n  transform: rotate(0deg);\n  /* .transform(scale(0.7)); */\n  /* position: relative !important; */ }\n  .hocr-viewer .hocr-viewer-container > div {\n    overflow: auto; }\n\n.hocr-viewer *[class^=\"ocr\"]:hover::before {\n  display: none; }\n\n.hocr-viewer.hocr-viewer-feature-Layout *[class^=\"ocr\"] {\n  position: fixed;\n  white-space: nowrap;\n  justify-content: left;\n  /* align horizontal */\n  align-items: center;\n  /* align vertical */ }\n\n.hocr-viewer.hocr-viewer-feature-Layout.hocr-viewer-feature-Tooltip *[class^=\"ocr\"]:hover::before {\n  display: block;\n  background: white;\n  color: black !important;\n  border: 1px solid black;\n  font-family: monospace;\n  position: absolute;\n  font-size: 12px;\n  font-weight: bold;\n  line-height: 100%;\n  height: 15px;\n  top: -15px; }\n\n.hocr-viewer.hocr-viewer-feature-Highlight {\n  margin: -1px; }\n  .hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightNotPage *[class^=\"ocr\"]:not(.ocr_page) {\n    border: 3px solid red; }\n    .hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightNotPage *[class^=\"ocr\"]:not(.ocr_page):hover {\n      background: rgba(255, 153, 153, 0.2); }\n  .hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightInline .ocr_line *[class^=\"ocr\"] {\n    border: 3px solid green; }\n    .hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightInline .ocr_line *[class^=\"ocr\"]:hover {\n      background: rgba(26, 255, 26, 0.2); }\n  .hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightLine *[class^=\"ocr\"][class*=\"line\"] {\n    border: 3px solid gold; }\n    .hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightLine *[class^=\"ocr\"][class*=\"line\"]:hover {\n      background: rgba(255, 239, 153, 0.2); }\n  .hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightPar .ocr_par {\n    border: 3px solid purple; }\n    .hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightPar .ocr_par:hover {\n      background: rgba(255, 26, 255, 0.2); }\n  .hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightCarea .ocr_carea {\n    border: 3px solid blue; }\n    .hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightCarea .ocr_carea:hover {\n      background: rgba(153, 153, 255, 0.2); }\n\n.hocr-viewer.hocr-viewer-feature-BackgroundImage {\n  background-repeat: no-repeat; }\n  .hocr-viewer.hocr-viewer-feature-BackgroundImage .ocr_page {\n    background-size: contain; }\n\n.hocr-viewer.hocr-viewer-feature-DisableEmStrong em {\n  font-style: normal; }\n\n.hocr-viewer.hocr-viewer-feature-DisableEmStrong strong {\n  font-weight: normal; }\n\n.hocr-viewer.hocr-viewer-feature-TransparentText .ocr_page {\n  color: transparent; }\n", ""]);

// exports


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _BackgroundImage = __webpack_require__(19);

var _BackgroundImage2 = _interopRequireDefault(_BackgroundImage);

var _ContentEditable = __webpack_require__(20);

var _ContentEditable2 = _interopRequireDefault(_ContentEditable);

var _Font = __webpack_require__(21);

var _Font2 = _interopRequireDefault(_Font);

var _Layout = __webpack_require__(22);

var _Layout2 = _interopRequireDefault(_Layout);

var _ScaleFont = __webpack_require__(23);

var _ScaleFont2 = _interopRequireDefault(_ScaleFont);

var _Tooltip = __webpack_require__(24);

var _Tooltip2 = _interopRequireDefault(_Tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  BackgroundImage: _BackgroundImage2.default,
  ContentEditable: _ContentEditable2.default,
  Font: _Font2.default,
  Layout: _Layout2.default,
  ScaleFont: _ScaleFont2.default,
  Tooltip: _Tooltip2.default
};

/***/ }),
/* 19 */
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
/* 20 */
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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _hocrDom = __webpack_require__(0);

var _utils = __webpack_require__(4);

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
/* 22 */
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
/* 23 */
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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _hocrDom = __webpack_require__(0);

var _utils = __webpack_require__(4);

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

/***/ })
/******/ ]);
//# sourceMappingURL=hocr.viewer.js.map