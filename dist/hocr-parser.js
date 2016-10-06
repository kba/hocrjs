/*!
The MIT License (MIT)

Copyright (c) 2016 Konstantin Baierer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
/*!
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
(function(global)  {
    function HocrParser() {}

    HocrParser.prototype.bbox = function bbox(titleString) {
        if (typeof titleString !== 'string') titleString = titleString.getAttribute('title');
        return titleString
            .match(/bbox\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/)
            .slice(1)
            .map((coord) => parseInt(coord));
    }

    HocrParser.prototype.image = function image(titleString) {
        if (typeof titleString !== 'string') titleString = titleString.getAttribute('title');
        return titleString.match(/image\s+"([^"]+)"/)[1];
    }

    /* ---------------------------- *
     * Browser / NodeJS boilerplate *
     * ---------------------------- */
    // AMD support
    if (typeof define === 'function' && define.amd) {
        define(function() { return HocrParser; });
        // CommonJS and Node.js module support.
    } else if (typeof exports !== 'undefined') {
        // Support Node.js specific `module.exports` (which can be a function)
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = HocrParser;
        }
        // But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
        exports.HocrParser = HocrParser;
    } else {
        global.HocrParser = HocrParser;
    }
}(this));

//# sourceMappingURL=hocr-parser.js.map.json