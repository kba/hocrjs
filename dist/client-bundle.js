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
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*!
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *   _
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  | |__   ___   ___ _ __      _ __   __ _ _ __ ___  ___ _ __
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  | '_ \ / _ \ / __| '__|____| '_ \ / _` | '__/ __|/ _ \ '__|
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  | | | | (_) | (__| | |_____| |_) | (_| | |  \__ \  __/ |
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  |_| |_|\___/ \___|_|       | .__/ \__,_|_|  |___/\___|_|
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *                             |_|
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  This software may be modified and distributed under the terms
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  of the MIT license.  See the LICENSE file for details.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	
	__webpack_require__(1);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var HocrParser = function () {
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
	
	exports.default = HocrParser;

/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	 * Created by elgs on 7/2/14.
	 */
	
	(function () {
	    "use strict";
	
	    module.exports = function (input, sep, keepQuotes) {
	        var separator = sep || /\s/g;
	        var singleQuoteOpen = false;
	        var doubleQuoteOpen = false;
	        var tokenBuffer = [];
	        var ret = [];
	
	        var arr = input.split('');
	        for (var i = 0; i < arr.length; ++i) {
	            var element = arr[i];
	            var matches = element.match(separator);
	            if (element === "'" && !doubleQuoteOpen) {
	                if (keepQuotes === true) {
	                    tokenBuffer.push(element);
	                }
	                singleQuoteOpen = !singleQuoteOpen;
	                continue;
	            } else if (element === '"' && !singleQuoteOpen) {
	                if (keepQuotes === true) {
	                    tokenBuffer.push(element);
	                }
	                doubleQuoteOpen = !doubleQuoteOpen;
	                continue;
	            }
	
	            if (!singleQuoteOpen && !doubleQuoteOpen && matches) {
	                if (tokenBuffer.length > 0) {
	                    ret.push(tokenBuffer.join(''));
	                    tokenBuffer = [];
	                } else if (!!sep) {
	                    ret.push(element);
	                }
	            } else {
	                tokenBuffer.push(element);
	            }
	        }
	        if (tokenBuffer.length > 0) {
	            ret.push(tokenBuffer.join(''));
	        } else if (!!sep) {
	            ret.push('');
	        }
	        return ret;
	    };
	})();

/***/ }
/******/ ]);
//# sourceMappingURL=client-bundle.js.map