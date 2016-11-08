/* BEGIN-BANNER -f smmono12 -i ' * ' -C "2016 Konstantin Baierer"  -L MIT
 *             █  ▗▄▖
 *       ▐▌    ▀  ▝▜▌
 * ▐▌ ▐▌▐███  ██   ▐▌  ▗▟██▖
 * ▐▌ ▐▌ ▐▌    █   ▐▌  ▐▙▄▖▘
 * ▐▌ ▐▌ ▐▌    █   ▐▌   ▀▀█▖
 * ▐▙▄█▌ ▐▙▄ ▗▄█▄▖ ▐▙▄ ▐▄▄▟▌
 *  ▀▀▝▘  ▀▀ ▝▀▀▀▘  ▀▀  ▀▀▀
 *
 * Copyright (c) 2016 Konstantin Baierer
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 *

 * END-BANNER */
export default class Utils {
    static addCssFragment(styleId, css) {
        var style = document.querySelector(`#${styleId}`);
        if (!style) {
            style = document.createElement('style');
            style.id = styleId;
            document.head.appendChild(style);
        }
        style.appendChild(document.createTextNode(css));
    }
}

