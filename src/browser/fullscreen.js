/*
 * Copyright (c) 2016-2017 Konstantin Baierer
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */

import '../sass/normalize.scss'
import '../sass/hocr-viewer.scss'
import {HocrViewer} from './viewer'
window.hocrViewer = new HocrViewer({root: document.querySelector('body')})
window.hocrViewer.init()
