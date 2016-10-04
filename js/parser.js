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
