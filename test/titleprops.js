var test = require('tape');
var Parser = require('../js/parser.js');
var parser = new Parser();

test(function(t) {
    t.deepEquals(parser.bbox('bbox 0 0 0 0'), [0,0,0,0]);
    t.end();
});
