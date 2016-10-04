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
(function() {
    function HocrViewer(config) {
        this.config = this.defaultConfig;
        Object.keys(config || {}).forEach((k) => {
            this.config[k] = config[k];
        });
        this.root = this.config.root
        if (typeof this.root === 'string')
            this.root = document.querySelector(this.root);
        this.parser = new window.HocrParser(this.config);
        this.features = [];
        Object.keys(this.config).forEach((k) => {
            if (k === 'expandToolbar') return;
            if (k === 'enableToolbar') return;
            if (typeof this.config[k] === 'boolean') {
                this.features.push(k);
            }
        });
    }

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
        fonts: [
            'sans-serif',
            'serif',
            'monospace',
            'UnifrakturCook',
            'UnifrakturMaguntia',
            'Old Standard TT',
            'Cardo',
        ],
        maxFontSize: 128,
        minFontSize: 2,
        backgroundImage: false,
        contentEditable: false,
        disableEmStrong: true,
        tooltips: true,
        scaleFontSize: false,
        borders: true,
        expandToolbar: true,
        enableToolbar: true,
        transparentText: false,
        rootClass: 'hocr-viewer',
        disableEmStrongClass: 'hocr-viewer-disable-emstrong',
        transparentTextClass: 'hocr-viewer-transparent-text',
        hiddenClass: 'hocr-viewer-hidden',
        bordersClass: 'hocr-viewer-borders',
        tooltipStyleId: 'hocr-viewer-tooltip-style',
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
        context = (query.context || document.querySelector('.' + this.config.rootClass)) ;
        var set = Array.prototype.slice.call(context.querySelectorAll(qs));

        // terminal: Return only hocr-elements containing no hocr-elements themselves
        // container: Opposite
        if (query.terminal)
            set = set.filter(function(el) {if (!el.querySelector('*[class^="ocr"]')) return el;});
        if (query.container)
            set = set.filter(function(el) {if (el.querySelector('*[class^="ocr"]')) return el; });

        // Arbitrary filter function
        if (query.filter) {
            set = set.filter(query.filter);
        }

        return set;
    }


    HocrViewer.prototype.placeOcrElements = function placeOcrElements() {
        this.findByOcrClass({title: 'bbox'}).forEach((el) => {
            var coords = this.parser.bbox(el);
            el.style.left = coords[0] + "px";
            el.style.top = coords[1] + "px";
            el.style.width = coords[2] - coords[0] + "px";
            el.style.height = coords[3] - coords[1] + "px";
        });
        var coords = this.parser.bbox(document.querySelector('.ocr_page'));
        document.querySelector('body').style.minHeight = coords[2] + 'px';

    }

    HocrViewer.prototype.toggleScaleFontSize = function toggleScaleFontSize(onoff) {
        console.profile('toggleScaleFontSize');
        this.hidden.innerHTML = '';
        if (onoff) {
            this.hidden.style.display = 'block';
            this.findByOcrClass({terminal: true}).forEach((el) => this.scaleFontSize(el))
            this.hidden.style.display = 'none';
        } else {
            this.findByOcrClass({terminal: true}).forEach((el) => el.style.fontSize = 'initial')
        }
        console.profileEnd('toggleScaleFontSize');
    }

    HocrViewer.prototype.scaleFontSize = function scaleFontSize(el) {
        if (el.textContent.trim().length == 0) return;
        var wrap = document.createElement('span')
        wrap.style.fontFamily = el.style.fontFamily;
        this.hidden.appendChild(wrap);
        wrap.innerHTML = el.textContent;
        var fontsize = el.clientHeight;
        do {
            fontsize -= 1;
            wrap.style['font-size'] = fontsize + 'px';
            if (fontsize <= this.config.minFontSize) break;
            this.log(2, `${fontsize}:`,
                `width: ${wrap.clientWidth} < ${el.clientWidth}`,
                `height ${wrap.clientHeight} < ${el.clientHeight}`);
            } while (wrap.offsetWidth >= el.offsetWidth
                || wrap.offsetHeight >= el.offsetHeight);
        el.style['font-size'] = fontsize + 'px';
        this.hidden.removeChild(wrap);
    }

    HocrViewer.prototype.toggleTooltips = function toggleTooltips(onoff) {
        var style = document.querySelector('#' + this.config.tooltipStyleId);
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
                style.setAttribute('id', this.config.tooltipStyleId);
            }
            style.appendChild(document.createTextNode(Object.keys(ocrClasses).map((cls) =>
                `.${this.config.rootClass} .${cls}:hover::before { content: "${cls}"; }\n`
            ).join("\n")));
            document.querySelector('head').appendChild(style);
        }
    }

    HocrViewer.prototype.toggleBackgroundImage = function toggleBackgroundImage(onoff) {
        if (onoff) {
            this.findByOcrClass({title: 'image'}).forEach((el) => {
                var imageFile = this.parser.image(el);
                this.root.style.backgroundImage = `url(${imageFile})`;
            });
        } else {
            this.root.style.backgroundImage = '';
            // delete this.root.style.backgroundImage;
        }
    }

    HocrViewer.prototype.toggleBorders = function toggleBorders(onoff) {
        this.root.classList.toggle(this.config.bordersClass, onoff);
    }

    HocrViewer.prototype.toggleDisableEmStrong = function toggleDisableEmStrong(onoff) {
        this.root.classList.toggle(this.config.disableEmStrongClass, onoff);
    }

    HocrViewer.prototype.toggleContentEditable = function toggleContentEditable(onoff) {
        var onContentEditableInput = (ev) => {
            console.warn("Scaling of contentEditable is broken right now");
            if (this.config.scaleFontSize) {
                this.scaleFontSize(ev.target);
                this.findByOcrClass({context: ev.target}).forEach((child) => {
                    this.scaleFontSize(child);
                })
            }
        }
        this.findByOcrClass({class: ['line', 'x_word'], clauses: ''}).forEach((el) => {
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

    HocrViewer.prototype.toggleTransparentText = function toggleTransparentText(onoff) {
        this.root.classList.toggle(this.config.transparentTextClass, onoff);
    }

    HocrViewer.prototype.onConfigChange = function onConfigChange() {
        this.features.forEach((feature) => {
            var toggle = 'toggle' + feature.substr(0,1).toUpperCase() + feature.substring(1);
            this.log(0, `Should use this.${toggle}`);
            this[toggle](this.config[feature]);
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
    </div>`;
        this.toolbar.querySelector('.toggler').addEventListener('click', (ev) => {
            this.config.expandToolbar = !this.config.expandToolbar;
            this.toggleExpandToolbar(this.config.expandToolbar);
        });
        var fontSelect = this.toolbar.querySelector('select.fontlist');
        this.config.fonts.forEach((font) => {
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
        this.features.forEach((feature) => {
            var li = document.createElement('li');
            var label = document.createElement('label');
            label.innerHTML = feature;
            var checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');
            checkbox.checked = this.config[feature];
            li.classList.toggle('checked', checkbox.checked);
            var onChange = (ev) => {
                li.classList.toggle('checked', checkbox.checked);
                this.config[feature] = checkbox.checked;
                this.onConfigChange();
            };
            li.addEventListener('click', (ev) => {
                checkbox.checked = !checkbox.checked;
                // onChange();
                li.classList.toggle('checked');
                this.config[feature] = checkbox.checked;
                this.onConfigChange();
            });
            checkbox.addEventListener('change', onChange);
            li.appendChild(checkbox);
            li.appendChild(label);
            this.toolbar.querySelector('.features').appendChild(li);
        });
    }

    HocrViewer.prototype.init = function init() {
        this.root.classList.add(this.config.rootClass);

        // 'hidden' element containing wrappers for font-size expansion
        this.hidden = document.createElement('div');
        this.hidden.setAttribute('class', this.config.hiddenClass);
        this.root.appendChild(this.hidden);

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