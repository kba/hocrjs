// ==UserScript==
// @name         hocr-viewer
// @namespace    http://github.com/kba/hocrjs
// @updateURL    __UPDATE_SERVER__/hocr.user.js
// @version      __VERSION__
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
  function injectHocrViewer() {
    const script = document.createElement('script')
    script.src = "__ASSET_SERVER__/hocr.fullscreen.js?cachebuster=" + Math.random() * 10000000000000000
    script.type = 'text/javascript'
    document.querySelector('body').appendChild(script)
  }

  // Add menu option
  GM_registerMenuCommand('Inject hOCR viewer', injectHocrViewer)

  // Automatically inject hOCR viewer for local files
  if (document.location.protocol === 'file:' && document.querySelector('.ocr_page')) {
    injectHocrViewer()
  }

})()
