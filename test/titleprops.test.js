import {test} from 'babel-tap'
import PropertyParser from '../src/lib/property-parser'

test("PropertyParser", (t) => {
    'use strict';

    var pp = new PropertyParser({allowUnknown:true, debug: process.env.DEBUG});
    var mergeFixtures = function(names) {
        var fixture = [names.map((name) => fixtures[name][0]).join(';'),fixtures[names[0]][1], {} ];
        for (let i = 0; i < names.length; i++) {
            let name = names[i];
            if (i>0) fixture[1] = fixture[1].concat(';').concat(fixtures[name][1]);
            for (let k in fixtures[name][2]) fixture[2][k] = fixtures[name][2][k];
        }
        return fixture;
    };
    var fixtures = {
        'bbox 1': ["bbox 2 23 4.56 23", ['bbox','2','23','4.56','23'], {bbox:[2,23,4,23]}],
        'bbox trailing semicolon': ["bbox 2 23 4.56 23;", ['bbox','2','23','4.56','23', ';'], {bbox:[2,23,4,23]}],
        "cflow 1": ["cflow 'a\\'2'", ['cflow',"a\\'2"], {cflow:'a\\\'2'}],
        "cflow 2": ["cflow 'a\\'2';", ['cflow',"a\\'2",';'], {cflow:'a\\\'2'}],
        "baseline 1": ["baseline 0.015 -18", ['baseline','0.015','-18'], {baseline:[0.015, -18]}],
        "cuts": ["cuts 9 11 7,8,-2 15 3", ['cuts','9','11','7,8,-2','15','3'], {cuts: [[9],[11],[7,8,-2],[15],[3]]}],
        "ppageno 1": ["ppageno 23", ['ppageno', '23'], {ppageno: 23}],
        "hardbreak 1": ["hardbreak 1", ['hardbreak', '1'], {hardbreak: true}],
        "image foobarquux.jpg": ["image foobarquux.jpg", ['image', 'foobarquux.jpg'], {image: 'foobarquux.jpg'}],
        "poly min": ["poly 1 1 2 2", ['poly', '1', '1', '2', '2'], {poly: [1, 1, 2, 2]}],
    };
    fixtures['bbox + cflow'] = mergeFixtures(['bbox 1', 'cflow 1', 'baseline 1']);
    for (let fixtureName in fixtures) {
        var fixture = fixtures[fixtureName];
        t.deepEquals(pp.tokenize(fixture[0]), fixture[1], `'${fixtureName}' tokenized`);
        t.deepEquals(pp.parse(fixture[0]), fixture[2], `'${fixtureName}' parsed`);
    }
    t.end();
});
