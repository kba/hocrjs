'use strict';

var _viewer = require('./viewer');

var _viewer2 = _interopRequireDefault(_viewer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.hocrViewer = new _viewer2.default({ root: document.querySelector('body') });
window.hocrViewer.init();