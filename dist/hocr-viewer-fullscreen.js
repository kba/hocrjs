/*!
The MIT License (MIT)

Copyright (c) 2016 Konstantin Baierer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
/*!
 *   _
 *  | |__   ___   ___ _ __      _ __   __ _ _ __ ___  ___ _ __
 *  | '_ \ / _ \ / __| '__|____| '_ \ / _` | '__/ __|/ _ \ '__|
 *  | | | | (_) | (__| | |_____| |_) | (_| | |  \__ \  __/ |
 *  |_| |_|\___/ \___|_|       | .__/ \__,_|_|  |___/\___|_|
 *                             |_|
 *
 *  This software may be modified and distributed under the terms
 *  of the MIT license.  See the LICENSE file for details.
 */
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

    /* ---------------------------- *
     * Browser / NodeJS boilerplate *
     * ---------------------------- */
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
/*!
 *   _                               _
 *  | |__   ___   ___ _ __    __   _(_) _____      _____ _ __
 *  | '_ \ / _ \ / __| '__|___\ \ / / |/ _ \ \ /\ / / _ \ '__|
 *  | | | | (_) | (__| | |_____\ V /| |  __/\ V  V /  __/ |
 *  |_| |_|\___/ \___|_|        \_/ |_|\___| \_/\_/ \___|_|
 *
 *
 *  This software may be modified and distributed under the terms
 *  of the MIT license.  See the LICENSE file for details.
 */
(function() {

    var Utils = {
        addCssFragment: function(styleId, css) {
            var style = document.querySelector(`#${styleId}`);
            if (!style) {
                style = document.createElement('style');
                style.id = styleId;
                document.head.appendChild(style);
            }
            style.appendChild(document.createTextNode(css));
        }
    };

    function HocrViewer(config) {
        this.config = this.defaultConfig;
        Object.keys(config || {}).forEach((k) => {
            // TODO proper conifg
            this.config[k] = config[k];
        });
        this.root = this.config.root
        if (typeof this.root === 'string')
            this.root = document.querySelector(this.root);
        this.parser = new window.HocrParser(this.config);
        Object.keys(this.config.fonts).forEach((font) => {
            var cssUrl = this.config.fonts[font].cssUrl;
            if (cssUrl) Utils.addCssFragment('hocr-view-font-styles', `@import "${cssUrl}";\n`);
        });
        this.cache = {
            scaleFont: {}
        }
    }

    // TODO
    HocrViewer.prototype.log = function logdebug() {
        var level = arguments[0];
        if (level > this.config.debugLevel) return;
        var args = Array.prototype.slice.call(arguments, [1]);
        var levelToFn = ['info', 'debug', 'log'];
        console[levelToFn[level]].apply(console, args);
    }

    HocrViewer.prototype.defaultConfig = {
        root: 'body',
        debugLevel: 1,
        fonts: {
            'sans-serif': {},
            serif: {},
            monospace: {},
            UnifrakturCook: {
                cssUrl: 'https://fonts.googleapis.com/css?family=UnifrakturCook:700',
            },
            UnifrakturMaguntia: {
                cssUrl: 'https://fonts.googleapis.com/css?family=UnifrakturMaguntia',
            },
            'Old Standard TT': {
                cssUrl: 'https://fonts.googleapis.com/css?family=Old+Standard+TT',
            },
            Cardo: {
                cssUrl: 'https://fonts.googleapis.com/css?family=Cardo'
            },
            'Noto Serif': {
                cssUrl: 'https://fonts.googleapis.com/css?family=Noto+Serif:400,400i,700&subset=latin-ext'
            },
            'Libre Baskerville': {
                cssUrl: 'https://fonts.googleapis.com/css?family=Libre+Baskerville:400,400i,700&subset=latin-ext'
            },
        },
        features: {
            backgroundImage: {
                enabled: false,
            },
            scaleFont: {
                enabled: false,
                maxFontSize: 128,
                minFontSize: 2,
                wrapClass: 'hocr-viewer-wrap',
            },
            disableEmStrong: {
                enabled: false,
            },
            contentEditable: {
                enabled: false,
            },
            tooltips: {
                enabled: false,
                styleId: 'hocr-viewer-tooltip-style',
            },
            borders: {
                enabled: true,
            },
            transparentText: {
                enabled: false,
            },
        },
        expandToolbar: true,
        enableToolbar: true,
        transparentText: false,
        rootClass: 'hocr-viewer',
        toolbarId: 'hocr-viewer-toolbar',
    };

    HocrViewer.prototype.findByOcrClass = function findByOcrClass(query) {
        query = (query || {});

        // Expect tag
        query.tag = (query.tag || '*');

        // Arbitrary clauses
        query.clauses = (query.clauses || '');

        // Return only hocr-elements with a bbox
        if (query.title) query.clauses += `[title*="${query.title}"]`

        // Return specific ocr_* / ocrx_* classes
        query.class = (query.class || '');
        if (typeof query.class === 'string') query.class = [query.class];

        // Build querySelectorAll query
        var qs = query.class.map(function(cls) {
            if (cls.indexOf('ocr') == 0) return cls
            if (cls == '') return 'ocr';
            if (cls.indexOf('x_') != 0) return `ocr_${cls}`;
            return `ocr${cls}`;
        }).map(function(cls) {
            return `:scope ${query.tag}[class^="${cls}"]${query.clauses}`
        }).join(',');
        this.log(1, "findByOcrClass:", qs);
        context = (query.context || document.querySelector('.' + this.config.rootClass));
        var set = Array.prototype.slice.call(context.querySelectorAll(qs));

        // terminal: Return only hocr-elements containing no hocr-elements themselves
        // container: Opposite
        if (query.terminal)
            set = set.filter(function(el) {
                if (!el.querySelector('*[class^="ocr"]')) return el;
            });
        if (query.container)
            set = set.filter(function(el) {
                if (el.querySelector('*[class^="ocr"]')) return el;
            });

        // Arbitrary filter function
        if (query.filter) {
            set = set.filter(query.filter);
        }

        return set;
    }

    HocrViewer.prototype.placeOcrElements = function placeOcrElements() {
        this.findByOcrClass({
            title: 'bbox'
        }).forEach((el) => {
            var coords = this.parser.bbox(el);
            el.style.left = coords[0] + "px";
            el.style.top = coords[1] + "px";
            el.style.width = coords[2] - coords[0] + "px";
            el.style.height = coords[3] - coords[1] + "px";
        });
        var coords = this.parser.bbox(document.querySelector('.ocr_page'));
        document.querySelector('body').style.minHeight = coords[2] + 'px';
    }

    HocrViewer.prototype.toggleScaleFont = function toggleScaleFont(onoff) {
        // wrapper element containing wrappers for font-size expansion
        console.time('toggleScaleFont');
        var wrap = document.querySelector(`.${this.config.features.scaleFont.wrapClass}`);
        if (!wrap) {
            wrap = document.createElement('span');
            wrap.classList.add(this.config.features.scaleFont.wrapClass);
            this.root.appendChild(wrap);
        }
        if (onoff) {
            this.findByOcrClass({terminal: true}).forEach((el) => this.scaleFont(el, wrap))
            // wrap.style.display = 'none';
        } else {
            this.findByOcrClass({terminal: true}).forEach((el) => el.style.fontSize = 'initial')
        }
        console.timeEnd('toggleScaleFont');
    }

    HocrViewer.prototype.scaleFont = function scaleFont(el, wrap) {
        if (el.textContent.trim().length == 0) return;
        if (!(el.textContent in this.cache.scaleFont)) {
            // wrap.setAttribute('class', el.getAttribute('class'));
            // wrap.style.width = '100%';
            wrap.style.fontFamily = el.style.fontFamily;
            wrap.innerHTML = el.textContent;
            var w = 'offsetWidth';
            var h = 'offsetHeight';
            var fontsize = Math.min(el[w], el[h]);
            var min = this.config.features.scaleFont.minFontSize;
            wrap.style.fontSize = fontsize + 'px';
            if (fontsize > min && wrap[h] > el[h]) {
                fontsize -= wrap[h] - el[h];
                wrap.style.fontSize = fontsize + 'px';
            }
            while (fontsize > min && wrap[w] > el[w]) {
                fontsize -= 1;
                wrap.style.fontSize = fontsize + 'px';
            }
            // if (iterations > 1) console.debug(iterations, el.textContent, wrap[h], el[h], wrap[w], el[w]);
            this.cache.scaleFont[el.textContent] = fontsize;
        }
        el.style.fontSize = this.cache.scaleFont[el.textContent] + 'px';
    }

    HocrViewer.prototype.toggleTooltips = function toggleTooltips(onoff) {
        var style = document.querySelector('#' + this.config.features.tooltips.styleId);
        if (!onoff) {
            if (style) style.remove();
        } else {
            var ocrClasses = {};
            for (var el of this.findByOcrClass()) {
                ocrClasses[el.getAttribute('class')] = true;
            }
            this.log(0, "Detected OCR classes", Object.keys(ocrClasses));
            if (!style) {
                style = document.createElement('style');
                style.setAttribute('id', this.config.features.tooltips.styleId);
            }
            style.appendChild(document.createTextNode(Object.keys(ocrClasses).map((cls) =>
                `.${this.config.rootClass} .${cls}:hover::before { content: "${cls}"; }\n`
            ).join("\n")));
            document.head.appendChild(style);
        }
    }

    HocrViewer.prototype.toggleBackgroundImage = function toggleBackgroundImage(onoff) {
        var page = this.root.querySelector('.ocr_page');
        if (onoff) {
            this.findByOcrClass({
                title: 'image'
            }).forEach((el) => {
                var imageFile = this.parser.image(el);
                page.style.backgroundImage = `url(${imageFile})`;
            });
        } else {
            page.style.backgroundImage = '';
            // delete this.root.style.backgroundImage;
        }
    }

    HocrViewer.prototype.toggleContentEditable = function toggleContentEditable(onoff) {
        var onContentEditableInput = (ev) => {
            console.warn("Scaling of contentEditable is broken right now");
            if (this.config.features.scaleFont.enabled) {
                this.scaleFont(ev.target);
                this.findByOcrClass({
                    context: ev.target
                }).forEach((child) => {
                    this.scaleFont(child);
                })
            }
        }
        this.findByOcrClass({
            class: ['line', 'x_word'],
            clauses: '',
        }).forEach((el) => {
            if (onoff) {
                el.setAttribute('contentEditable', 'true');
                el.addEventListener('input', onContentEditableInput);
            } else {
                el.removeAttribute('contentEditable');
                el.removeEventListener('input', onContentEditableInput);
            }
        });
    }

    HocrViewer.prototype.toggleExpandToolbar = function toggleExpandToolbar(onoff) {
        this.toolbar.classList.toggle('expanded', onoff);
    }

    HocrViewer.prototype.toggleFeature = function toggleFeature(feature, onoff) {
        this.root.classList.toggle(`feature-${feature}`, onoff);
        var toggle = 'toggle' + feature.substr(0, 1).toUpperCase() + feature.substring(1);
        if (toggle in this) {
            this.log(0, `Calling this.${toggle}`);
            this[toggle](onoff);
        }
    }

    HocrViewer.prototype.onConfigChange = function onConfigChange() {
        Object.keys(this.config.features).forEach((feature) => {
            this.toggleFeature(feature, this.config.features[feature].enabled);
        });
    }

    /**
     * Add toolbar
     */
    HocrViewer.prototype.addToolbar = function addToolbar() {
        this.toolbar = document.querySelector('#' + this.config.toolbarId);
        if (this.toolbar) return;
        this.toolbar = document.createElement('div');
        this.toolbar.setAttribute('id', this.config.toolbarId);
        this.toolbar.classList.toggle('expanded', this.config.expandToolbar);
        document.body.appendChild(this.toolbar);
        this.toolbar.innerHTML = `
    <div class="toggler">
        <div class="toggler-inner toggler-show">
            &gt;<br/>&gt;<br/>&gt;<br/>&gt;<br/>&gt;<br/>&gt;<br/>&gt;<br/>&gt;<br/>&gt;<br/>
        </div>
        <div class="toggler-inner toggler-hide">
            &lt;<br/>&lt;<br/>&lt;<br/>&lt;<br/>&lt;<br/>&lt;<br/>&lt;<br/>&lt;<br/>&lt;<br/>
        </div>
    </div>
    <div class="wrapper">
        <h2>Font</h2>
        <select class="fontlist"></select>
        <h2>Features</h2>
        <ul class='features'>
        </ul>
        <h2>Zoom</h2>
        <input type='range' class='zoom' min='0' max='500' step='2' value="100"/>
    </div>`;
        this.toolbar.querySelector('.toggler').addEventListener('click', (ev) => {
            this.config.expandToolbar = !this.config.expandToolbar;
            this.toggleExpandToolbar(this.config.expandToolbar);
        });

        // fonts
        var fontSelect = this.toolbar.querySelector('select.fontlist');
        Object.keys(this.config.fonts).forEach((font) => {
            var fontOption = document.createElement('option');
            fontOption.innerHTML = font;
            fontOption.style.fontSize = 'large';
            fontOption.style.fontFamily = font;
            fontSelect.append(fontOption);
        });
        fontSelect.addEventListener('change', (ev) => {
            var selectedFont = ev.target.options[ev.target.selectedIndex].innerHTML;;
            this.findByOcrClass().forEach((el) => {
                el.style.fontFamily = selectedFont;
            });
            this.onConfigChange();
        });

        // features
        Object.keys(this.config.features).forEach((feature) => {
            var li = document.createElement('li');
            var checkbox = document.createElement('input');
            var label = document.createElement('label');
            li.appendChild(checkbox);
            li.appendChild(label);
            this.toolbar.querySelector('.features').appendChild(li);

            label.innerHTML = feature;

            checkbox.setAttribute('type', 'checkbox');
            checkbox.checked = this.config.features[feature].enabled;
            li.classList.toggle('checked', checkbox.checked);
            var onChange = (ev) => {
                li.classList.toggle('checked', checkbox.checked);
                this.config.features[feature].enabled = checkbox.checked;
                this.toggleFeature(feature, checkbox.checked);
            };
            li.addEventListener('click', (ev) => {
                checkbox.checked = !checkbox.checked;
                // onChange();
                li.classList.toggle('checked');
                this.config.features[feature].enabled = checkbox.checked;
                this.toggleFeature(feature, checkbox.checked);
            });
            checkbox.addEventListener('change', onChange);
        });

        // Zoom
        var zoomSlider = this.toolbar.querySelector('.zoom');
        zoomSlider.addEventListener('input', (ev) => {
            var scaleFactor = ev.target.value / 100.0;
            var page = this.root.querySelector('.ocr_page');
            page.style.transform = `scale(${scaleFactor})`;
            page.style.transformOrigin = 'top left';
            // console.log();
        });
    }

    HocrViewer.prototype.init = function init() {
        this.root.classList.add(this.config.rootClass);

        if (this.config.enableToolbar) {
            this.addToolbar();
        }

        // place the elements on the page
        this.placeOcrElements();

        // Events
        this.onConfigChange();
        window.addEventListener('resize', () => this.onConfigChange());
    }

    window.HocrViewer = HocrViewer;
}(this));
(function(window) {
    window.hocrViewer = new window.HocrViewer({root: document.querySelector('body')});
    window.hocrViewer.init();
}(this));

//# sourceMappingURL=hocr-viewer-fullscreen.js.map.json