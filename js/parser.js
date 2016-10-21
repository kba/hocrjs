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

    HocrParser.prototype.bbox = function bbox(s) {
        return this._titleString(s)
            .match(/bbox\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/)
            .slice(1)
            .map((coord) => parseInt(coord));
    };

    HocrParser.prototype.image = function image(s) {
        return this._titleString(s).match(/image\s+"([^"]+)"/)[1];
    };

    /* --------------- *
     * Private methods *
     * --------------- */
    HocrParser.prototype._titleString = function titleString(s) {
        if (typeof s === 'string') return s;
        return s.getAttribute('title');
    };


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
