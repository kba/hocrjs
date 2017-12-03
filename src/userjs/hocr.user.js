// ==UserScript==
// @name         hocr-viewer
// @namespace    http://github.com/kba/hocrjs
// @updateURL    __UPDATE_SERVER__/hocr-viewer.user.js
// @version      1.0.0.__DATE__
// @description  Add hocr-viewer controls to a apage
// @author       kba
// @include      http://*/*
// @include      https://*/*
// @include      file:///*
// @grant        GM_registerMenuCommand
// @run-at       document-end
// ==/UserScript==

/*
 * Copyright (c) 2016-2017 Konstantin Baierer
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */

(function() {
    'use strict'
    function hocrViewerAsset(name) {
        return "__ASSET_SERVER__/" + name + "?cachebuster=" + Math.random() * 10000000000000000
    }
    function injectScript(url) {
        var script = document.createElement('script')
        script.src = url
        script.type = 'text/javascript'
        document.querySelector('body').appendChild(script)
    }
    GM_registerMenuCommand('Inject hOCR viewer', injectHocrViewer)
    if (document.location.protocol === 'file:' && document.querySelector('.ocr_page')) {
        injectScript(hocrViewerAsset('hocr-fullscreen.webpack.js'))
    }

})()
