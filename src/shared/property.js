/* BEGIN-BANNER -f smmono12 -i ' * ' -C "2016 Konstantin Baierer"  -L MIT
 * END-BANNER */

class HocrProperty {

    constructor(name, values) {
        this.name = name;
        this.values = values;
    }

    serialize() {
        return `${this.name} ${this.values.map((val) => { return `"${val}"`; }).join(' ')}`
    }

}
