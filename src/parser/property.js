/*
 * Copyright (c) 2016-2017 Konstantin Baierer
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */

class HocrProperty {

    constructor(name, values) {
        this.name = name
        this.values = values
    }

    serialize() {
        return `${this.name} ${this.values.map((val) => {return `"${val}"`}).join(' ')}`
    }

}
