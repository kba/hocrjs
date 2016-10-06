// ==UserScript==
// @name         hocr-viewer
// @namespace    http://github.com/kba/hocrjs
// @updateURL    https://kba.github.io/hocrjs/dist/hocr-viewer.user.js
// @version      1.0.0.__DATE__
// @description  Add hocr-viewer controls to a apage
// @author       kba
// @include      http://*/*
// @include      https://*/*
// @include      file:///*
// @grant        GM_registerMenuCommand
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    var REPO_BASEURL = 'https://kba.github.io/hocrjs/dist/';
    // var REPO_BASEURL = 'http://localhost:8888/dist/';
    function hocrViewerAsset(name) {
        return REPO_BASEURL + name + "?cachebuster=" + Math.random() * 10000000000000000;
    }
    function injectHocrViewer() {
        var style = document.createElement('link');
        style.href = hocrViewerAsset('hocr-viewer.css');
        style.rel = 'stylesheet';
        document.querySelector('head').appendChild(style);
        var script = document.createElement('script');
        script.src = hocrViewerAsset('hocr-viewer-fullscreen.js');
        script.type = 'text/javascript';
        document.querySelector('body').appendChild(script);
    }
    GM_registerMenuCommand('Inject hOCR viewer', injectHocrViewer);
    if (document.location.protocol === 'file:' && document.querySelector('.ocr_page')) {
        injectHocrViewer();
    }

})();
