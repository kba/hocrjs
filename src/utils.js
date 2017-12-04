/*
 * Copyright (c) 2016-2017 Konstantin Baierer
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */

export default class Utils {

    static addCssFragment(styleId, css) {
        let style = document.querySelector(`#${styleId}`)
        if (!style) {
            style = document.createElement('style')
            style.id = styleId
            document.head.appendChild(style)
        }
        style.appendChild(document.createTextNode(css))
    }

}
