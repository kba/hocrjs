// ==UserScript==
// @name         hocr-viewer
// @namespace    http://github.com/kba/hocrjs
// @updateURL    https://kba.github.io/hocrjs/dist/hocr-viewer.user.js
// @version      1.0.0.1478600181.826
// @description  Add hocr-viewer controls to a apage
// @author       kba
// @include      http://*/*
// @include      https://*/*
// @include      file:///*
// @grant        GM_registerMenuCommand
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';

    function hocrViewerAsset(name) {
        return "https://kba.github.io/hocrjs/dist/" + name + "?cachebuster=" + Math.random() * 10000000000000000;
    }
    function injectStyle(url) {
        var style = document.createElement('link');
        style.href = url;
        style.rel = 'stylesheet';
        document.querySelector('head').appendChild(style);
    }
    function injectScript(url) {
        var script = document.createElement('script');
        script.src = url;
        script.type = 'text/javascript';
        document.querySelector('body').appendChild(script);
    }
    function injectHocrViewer() {
        injectStyle(hocrViewerAsset('hocr-viewer.css'));
        injectScript(hocrViewerAsset('hocr-viewer-fullscreen.js'));
    }
    GM_registerMenuCommand('Inject hOCR viewer', injectHocrViewer);
    if (document.location.protocol === 'file:' && document.querySelector('.ocr_page')) {
        injectHocrViewer();
    }
})();