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

export class HocrParser {

    parseTitle(s) {
        s = this._titleString(s);
        var prev = '';
        for (var i = 0; i < s.length; i++) {
        }
    }

    bbox(s) {
        return this._titleString(s)
            .match(/bbox\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/)
            .slice(1)
            .map((coord) => parseInt(coord));
    }

    image(s) {
        return this._titleString(s).match(/image\s+"([^"]+)"/)[1];
    }

    /* --------------- *
     * Private methods *
     * --------------- */
    _titleString(s) {
        if (typeof s === 'string') return s;
        return s.getAttribute('title');
    }
}

// export { PropertyMapParser, HocrParser };
