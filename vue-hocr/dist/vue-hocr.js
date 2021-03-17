!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?exports.VueHocr=r():e.VueHocr=r()}(self,(function(){return(()=>{var e={788:e=>{"use strict";e.exports=function(e){var r=[];return r.toString=function(){return this.map((function(r){var t=e(r);return r[2]?"@media ".concat(r[2]," {").concat(t,"}"):t})).join("")},r.i=function(e,t,o){"string"==typeof e&&(e=[[null,e,""]]);var n={};if(o)for(var a=0;a<this.length;a++){var i=this[a][0];null!=i&&(n[i]=!0)}for(var l=0;l<e.length;l++){var c=[].concat(e[l]);o&&n[c[0]]||(t&&(c[2]?c[2]="".concat(t," and ").concat(c[2]):c[2]=t),r.push(c))}},r}},278:(e,r,t)=>{function o(e,...r){e.debug&&console.log("# ",new Date,...r)}const n=new(t(635));class a{static isHocrElement(e,r,t={}){return void 0===t._isHocrElement&&(t._isHocrElement=!!Array.from(e.classList).find((e=>e.startsWith("ocr")))),t._isHocrElement}static getHocrProperties(e,r={},t={}){let{propertyParser:o}=r;return o||(o=n),t._hocr||(a.isHocrElement(e,r,t)?t._hocr=o.parse(e.getAttribute("title")):t._hocr={}),t._hocr}static queryHocr(...e){return Array.from(a.queryHocrAll(...e))[0]}static queryHocrAll(e,r={},t={}){(Array.isArray(r)||"string"==typeof r)&&(r={class:r}),r.tag=r.tag||"*",r.clauses=r.clauses||"",r.title&&(r.clauses+=`[title*="${r.title}"]`),r.class=r.class||"","string"==typeof r.class&&(r.class=[r.class]);let n=r.class.map((function(e){return 0===e.indexOf("ocr")?e:""===e?"ocr":0!==e.indexOf("x_")?`ocr_${e}`:`ocr${e}`})).map((function(e){return`${r.tag}[class^="${e}"]${r.clauses}`})).join(",");o(t,"findByOcrClass:",n);const a=e.querySelectorAll(n);let i=Array.from(a);return r.terminal&&(i=i.filter((function(e){if(!e.querySelector('*[class^="ocr"]'))return e}))),r.nonTerminal&&(i=i.filter((function(e){if(e.querySelector('*[class^="ocr"]'))return e}))),r.filter&&(o(t,{query:r}),i=i.filter(r.filter)),Object.create(i,a.prototype)}static extendPrototypes({Element:e,Document:r},t){[e.prototype,r.prototype].forEach((e=>{["queryHocr","queryHocrAll"].forEach((r=>{e[r]=function(e={},t){const o=e.context||this;return a[r](o,e,t)}})),Object.defineProperty(e,"_hocr",{enumerable:!1,writable:!0}),Object.defineProperty(e,"hocr",{get(){return a.getHocrProperties(this,t,this)}}),Object.defineProperty(e,"_isHocrElement",{enumerable:!0,writable:!0}),Object.defineProperty(e,"isHocrElement",{get(){return a.isHocrElement(this,t,this)}})})),a._initialized=!0}}e.exports=a},865:(e,r,t)=>{const o=t(278),n=t(635);e.exports={HocrDOM:o,HocrPropertyParser:n}},635:e=>{const r=";";e.exports=class{constructor(e={}){Object.assign(this,{debug:!1,allowUnknown:!1,allowUnknownEngineSpecific:!0,allowInvalidNumbers:!1,disableCardinalityChecks:!1},e),this.parsers={baseline:this.numberParser([parseFloat,parseInt]),bbox:this.numberParser(parseInt,{min:0},{length:4}),cflow:this.stringParser({collapse:!0}),cuts:e=>e.map((e=>this.numberParser(parseInt)(e.split(",")))),hardbreak:this.booleanParser({collapse:!0}),image:this.stringParser({collapse:!0}),imagemd5:this.stringParser({collapse:!0}),lpageno:this.stringParser({collapse:!0}),ppageno:this.numberParser(parseInt,{min:0},{collapse:!0}),nlp:this.numberParser(parseFloat,{min:0,max:100}),order:this.numberParser(parseInt,{min:0},{collapse:!0}),poly:this.numberParser(parseInt,{min:0},{minLength:4,modulo:2}),scan_res:this.numberParser(parseInt,{min:0}),textangle:this.numberParser(parseFloat,{},{collapse:!0}),x_bboxes:this.numberParser(parseInt,{min:0}),x_font:this.stringParser({collapse:!0}),x_fsize:this.numberParser(parseInt,{min:0}),x_confs:this.numberParser(parseFloat,{min:0,max:100}),x_scanner:this.stringParser(),x_source:this.stringParser(),x_wconf:this.numberParser(parseFloat,{min:0,max:100})}}checkCardinality(e,{length:r=-1,modulo:t=-1,collapse:o=!1,minLength:n=0,maxLength:a=Number.MAX_VALUE}){if(this.disableCardinalityChecks)return e;if(o&&(r=1),r>-1&&e.length!=r)throw Error(`Incorrect number of arguments (${e.length} != ${r})`);if(t>-1&&r%t>0)throw Error(`Number of arguments not a multiple of ${t} (${e.length})`);if(o)return e[0];if(e.length<n)throw Error(`Not enough arguments (${e.length} < ${n})`);if(e.length>a)throw Error(`Too many arguments (${e.length} > ${n})`);return e}booleanParser(e={}){return r=>this.checkCardinality(r.map((e=>Boolean.valueOf()(e))),e)}stringParser(e={}){return r=>this.checkCardinality(r,e)}numberParser(e,{min:r=-Number.MAX_VALUE,max:t=Number.MAX_VALUE}={},o={}){return Array.isArray(e)||(e=[e]),n=>{let a=0;return this.checkCardinality(n.map((o=>{let n=e[a++%e.length](o);if(!this.allowInvalidNumbers){if(Number.isNaN(n))throw Error(`Not a number: '${o}'`);if(n<r||n>t)throw Error(`Not in range [${r}..${t}]: '${o}'`)}return n})),o)}}parse(e){let t=this.tokenize(e);this.debug&&console.log(`tokenize('${e})`,t);let o={};for(let n=0;n<t.length;n++){let a,i=t[n];if(i in this.parsers)a=this.parsers[i];else{if(!(this.allowUnknown||i.startsWith("x_")&&this.allowUnknownEngineSpecific))throw Error(`Unknown property '${i}' in '${e}'`);a=this.stringParser()}let l,c=[];for(l=n+1;l<t.length&&t[l]!==r;l++)c.push(t[l]);n=l;try{c=a(c)}catch(r){throw console.log(`Parse error in '${e}'`),r}o[i]=c}return this.debug&&console.log("propertyMap",o),o}tokenize(e){let t=[],o=e.split(""),n=!1,a=!1,i=[],l="",c=()=>{t.push(i.join("")),i=[]};for(let e=0;e<o.length;e++){let s=e>0?o[e-1]:"";l=o[e],"'"!==l||"\\"==s||n?'"'!==l||"\\"==s||a?a||n||l!==r?a||n||!l.match(/\s/)?i.push(l):i.length>0&&c():(i.length>0&&c(),t[t.length-1]!==r&&t.push(r)):(n&&c(),n=!n):(a&&c(),a=!a)}return i.length>0&&c(),t}}},524:(e,r,t)=>{"use strict";t.d(r,{Z:()=>a});var o=t(788),n=t.n(o)()((function(e){return e[1]}));n.push([e.id,".hocrjs-toolbar{position:fixed;z-index:1;top:0;height:100%;border:none}.hocrjs-toolbar .toggler{float:left;position:fixed;left:0;font-family:monospace;color:#fff;background:#333;height:100vh;width:1em}.hocrjs-toolbar .toggler .toggler-inner{font-size:1.5em;top:40vh;position:fixed}.hocrjs-toolbar .toggler .toggler-hide{display:none}.hocrjs-toolbar .toggler .toggler-show{display:block}.hocrjs-toolbar .wrapper{position:fixed;margin-left:1em;background-color:rgba(180,180,190,0.85);overflow:hidden;left:-32em;transition:all 0.5s ease;height:100vh}.hocrjs-toolbar.expanded{border-right:3px solid #333}.hocrjs-toolbar.expanded .wrapper{padding-left:.5em;padding-right:.5em;width:15em;left:0}.hocrjs-toolbar.expanded .toggler-show{display:none}.hocrjs-toolbar.expanded .toggler-hide{display:block}.hocrjs-toolbar ul.features{list-style-type:none;padding:0}.hocrjs-toolbar ul.features li{background-color:#fcc;margin-bottom:2px;padding:5px 0}.hocrjs-toolbar ul.features li:before{content:'✗ '}.hocrjs-toolbar ul.features li.checked{background-color:#cfc}.hocrjs-toolbar ul.features li.checked:before{content:'✓ '}.hocrjs-toolbar ul.features li input[type='checkbox']{display:none}.hocrjs-toolbar ul.features li label{width:100%}.hocrjs-toolbar summary{font-size:120%}.hocrjs-toolbar summary span.font{font-size:100%}.hocrjs-toolbar select.font{width:80%;font-size:110%}\n",""]);const a=n},892:(e,r,t)=>{"use strict";t.d(r,{Z:()=>a});var o=t(788),n=t.n(o)()((function(e){return e[1]}));n.push([e.id,'.hocr-viewer.hocr-viewer-toolbar-enabled>.hocr-viewer-container{transform:rotate(0);margin-left:1em}.hocr-viewer .hocr-viewer-container{min-height:100vh;position:relative !important;-webkit-transform:rotate(0deg);-ms-transform:rotate(0deg);transform:rotate(0deg)}.hocr-viewer .hocr-viewer-container>div{overflow:auto}.hocr-viewer .hocr-viewer-container p{margin:0}.hocr-viewer *[class^="ocr"]:hover::before{display:none}.hocr-viewer.hocr-viewer-feature-Layout *[class^="ocr"]{position:fixed;white-space:nowrap;justify-content:left;align-items:center}.hocr-viewer.hocr-viewer-feature-Layout.hocr-viewer-feature-Tooltip *[class^="ocr"]:hover::before{display:block;background:white;color:black !important;border:1px solid black;font-family:monospace;position:absolute;font-size:12px;font-weight:bold;line-height:100%;height:15px;top:-15px}.hocr-viewer.hocr-viewer-feature-Highlight{margin:-1px}.hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightNotPage *[class^="ocr"]:not(.ocr_page){border:3px solid red}.hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightNotPage *[class^="ocr"]:not(.ocr_page):hover{background:rgba(255,153,153,0.2)}.hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightPage .ocr_page{border:3px solid #8b4513}.hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightPage .ocr_page:hover{background:rgba(231,143,80,0.2)}.hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightInlineNotBlank .ocr_line *[class^="ocr"]:not(.hocrjs-blank){border:3px solid green}.hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightInlineNotBlank .ocr_line *[class^="ocr"]:not(.hocrjs-blank):hover{background:rgba(26,255,26,0.2)}.hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightInlineBlank .ocr_line *[class^="ocr"].hocrjs-blank{border:3px solid #1aff1a}.hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightInlineBlank .ocr_line *[class^="ocr"].hocrjs-blank:hover{background:rgba(179,255,179,0.2)}.hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightLine *[class^="ocr"][class*="line"]{border:3px solid gold}.hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightLine *[class^="ocr"][class*="line"]:hover{background:rgba(255,239,153,0.2)}.hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightPar .ocr_par{border:3px solid purple}.hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightPar .ocr_par:hover{background:rgba(255,26,255,0.2)}.hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightCarea .ocr_carea{border:3px solid blue}.hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightCarea .ocr_carea:hover{background:rgba(153,153,255,0.2)}.hocr-viewer.hocr-viewer-feature-BackgroundImage{background-repeat:no-repeat}.hocr-viewer.hocr-viewer-feature-BackgroundImage .ocr_page{background-size:contain}.hocr-viewer.hocr-viewer-feature-DisableEmStrong em{font-style:normal}.hocr-viewer.hocr-viewer-feature-DisableEmStrong strong{font-weight:normal}.hocr-viewer.hocr-viewer-feature-TransparentText .ocr_page{color:rgba(0,0,0,0)}\n',""]);const a=n},34:(e,r,t)=>{"use strict";var o=t(788);t.n(o)()((function(e){return e[1]})).push([e.id,".hocrjs-toolbar{position:fixed;z-index:1;top:0;height:100%;border:none}.hocrjs-toolbar .toggler{float:left;position:fixed;left:0;font-family:monospace;color:#fff;background:#333;height:100vh;width:1em}.hocrjs-toolbar .toggler .toggler-inner{font-size:1.5em;top:40vh;position:fixed}.hocrjs-toolbar .toggler .toggler-hide{display:none}.hocrjs-toolbar .toggler .toggler-show{display:block}.hocrjs-toolbar .wrapper{position:fixed;margin-left:1em;background-color:rgba(180,180,190,0.85);overflow:hidden;left:-32em;transition:all 0.5s ease;height:100vh}.hocrjs-toolbar.expanded{border-right:3px solid #333}.hocrjs-toolbar.expanded .wrapper{padding-left:.5em;padding-right:.5em;width:15em;left:0}.hocrjs-toolbar.expanded .toggler-show{display:none}.hocrjs-toolbar.expanded .toggler-hide{display:block}.hocrjs-toolbar ul.features{list-style-type:none;padding:0}.hocrjs-toolbar ul.features li{background-color:#fcc;margin-bottom:2px;padding:5px 0}.hocrjs-toolbar ul.features li:before{content:'✗ '}.hocrjs-toolbar ul.features li.checked{background-color:#cfc}.hocrjs-toolbar ul.features li.checked:before{content:'✓ '}.hocrjs-toolbar ul.features li input[type='checkbox']{display:none}.hocrjs-toolbar ul.features li label{width:100%}.hocrjs-toolbar summary{font-size:120%}.hocrjs-toolbar summary span.font{font-size:100%}.hocrjs-toolbar select.font{width:80%;font-size:110%}\n",""])},292:(e,r,t)=>{"use strict";var o=t(788);t.n(o)()((function(e){return e[1]})).push([e.id,'.hocr-viewer.hocr-viewer-toolbar-enabled>.hocr-viewer-container{transform:rotate(0);margin-left:1em}.hocr-viewer .hocr-viewer-container{min-height:100vh;position:relative !important;-webkit-transform:rotate(0deg);-ms-transform:rotate(0deg);transform:rotate(0deg)}.hocr-viewer .hocr-viewer-container>div{overflow:auto}.hocr-viewer .hocr-viewer-container p{margin:0}.hocr-viewer *[class^="ocr"]:hover::before{display:none}.hocr-viewer.hocr-viewer-feature-Layout *[class^="ocr"]{position:fixed;white-space:nowrap;justify-content:left;align-items:center}.hocr-viewer.hocr-viewer-feature-Layout.hocr-viewer-feature-Tooltip *[class^="ocr"]:hover::before{display:block;background:white;color:black !important;border:1px solid black;font-family:monospace;position:absolute;font-size:12px;font-weight:bold;line-height:100%;height:15px;top:-15px}.hocr-viewer.hocr-viewer-feature-Highlight{margin:-1px}.hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightNotPage *[class^="ocr"]:not(.ocr_page){border:3px solid red}.hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightNotPage *[class^="ocr"]:not(.ocr_page):hover{background:rgba(255,153,153,0.2)}.hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightPage .ocr_page{border:3px solid #8b4513}.hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightPage .ocr_page:hover{background:rgba(231,143,80,0.2)}.hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightInlineNotBlank .ocr_line *[class^="ocr"]:not(.hocrjs-blank){border:3px solid green}.hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightInlineNotBlank .ocr_line *[class^="ocr"]:not(.hocrjs-blank):hover{background:rgba(26,255,26,0.2)}.hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightInlineBlank .ocr_line *[class^="ocr"].hocrjs-blank{border:3px solid #1aff1a}.hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightInlineBlank .ocr_line *[class^="ocr"].hocrjs-blank:hover{background:rgba(179,255,179,0.2)}.hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightLine *[class^="ocr"][class*="line"]{border:3px solid gold}.hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightLine *[class^="ocr"][class*="line"]:hover{background:rgba(255,239,153,0.2)}.hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightPar .ocr_par{border:3px solid purple}.hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightPar .ocr_par:hover{background:rgba(255,26,255,0.2)}.hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightCarea .ocr_carea{border:3px solid blue}.hocr-viewer.hocr-viewer-feature-Highlight.hocr-viewer-feature-HighlightCarea .ocr_carea:hover{background:rgba(153,153,255,0.2)}.hocr-viewer.hocr-viewer-feature-BackgroundImage{background-repeat:no-repeat}.hocr-viewer.hocr-viewer-feature-BackgroundImage .ocr_page{background-size:contain}.hocr-viewer.hocr-viewer-feature-DisableEmStrong em{font-style:normal}.hocr-viewer.hocr-viewer-feature-DisableEmStrong strong{font-weight:normal}.hocr-viewer.hocr-viewer-feature-TransparentText .ocr_page{color:rgba(0,0,0,0)}\n',""])}},r={};function t(o){if(r[o])return r[o].exports;var n=r[o]={id:o,exports:{}};return e[o](n,n.exports,t),n.exports}t.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return t.d(r,{a:r}),r},t.d=(e,r)=>{for(var o in r)t.o(r,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:r[o]})},t.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),t.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var o={};return(()=>{"use strict";t.r(o),t.d(o,{default:()=>H});var e=t(865);const r={name:"HocrToolbar",computed:{classList:function(){return{"hocrjs-toolbar":!0,expanded:this.expanded}}},props:{expandedInitial:{type:Boolean,default:!1}},data:function(){return{expanded:this.expandedInitial}},methods:{toggle:function(){this.expanded=!this.expanded}}};function n(e,r,t,o,n,a,i,l){var c,s="function"==typeof e?e.options:e;if(r&&(s.render=r,s.staticRenderFns=t,s._compiled=!0),o&&(s.functional=!0),a&&(s._scopeId="data-v-"+a),i?(c=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),n&&n.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(i)},s._ssrRegister=c):n&&(c=l?function(){n.call(this,(s.functional?this.parent:this).$root.$options.shadowRoot)}:n),c)if(s.functional){s._injectStyles=c;var h=s.render;s.render=function(e,r){return c.call(r),h(e,r)}}else{var u=s.beforeCreate;s.beforeCreate=u?[].concat(u,c):[c]}return{exports:e,options:s}}t(34);const a=n(r,(function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{class:e.classList},[t("div",{staticClass:"toggler",on:{click:e.toggle}},[e._m(0),e._v(" "),e._m(1)]),e._v(" "),t("div",{staticClass:"wrapper"},[t("button",{attrs:{disabled:0==e.$parent.currentPageIdx},on:{click:e.$parent.prevPage}},[e._v("prev")]),e._v(" "),t("button",[e._v(e._s(e.$parent.currentPageIdx+1)+" / "+e._s(e.$parent.lastPageIdx+1))]),e._v(" "),t("button",{attrs:{disabled:e.$parent.currentPageIdx==e.$parent.lastPageIdx},on:{click:e.$parent.nextPage}},[e._v("next")]),e._v(" "),t("details",{attrs:{open:""}},[t("summary",[e._v("Features")]),e._v(" "),t("ul",{staticClass:"features"},e._l(Object.keys(e.$parent.featuresAvailable),(function(r){return r.match(/Highlight[A-Z]/)?e._e():t("li",{key:r,class:{checked:e.$parent.isFeatureEnabled(r)},on:{click:function(t){return e.$parent.toggleFeature(r)}}},[t("label",[e._v(e._s(r))])])})),0)]),e._v(" "),t("details",{attrs:{open:""}},[t("summary",[e._v("Highlighting")]),e._v(" "),t("ul",{staticClass:"features"},e._l(Object.keys(e.$parent.featuresAvailable),(function(r){return r.match(/Highlight[A-Z]/)?t("li",{key:r,class:{checked:e.$parent.isFeatureEnabled(r)},on:{click:function(t){return e.$parent.toggleFeature(r)}}},[t("input",{attrs:{type:"checkbox"}}),e._v(" "),t("label",[e._v(e._s(r))])]):e._e()})),0)]),e._v(" "),t("details",{staticClass:"hocr-toolbar-zoom",attrs:{open:""}},[t("summary",[e._v("Zoom: "),t("span",{staticClass:"zoom"},[e._v(e._s(e.$parent.currentZoomRounded))]),e._v("%\n      ")]),e._v(" "),t("button",{staticClass:"zoom",on:{click:function(r){return e.$parent.zoom("-0.1")}}},[e._v("-")]),e._v(" "),t("input",{attrs:{type:"range",min:"0",max:"5",step:".02"},domProps:{value:e.$parent.currentZoom},on:{change:function(r){e.$parent.currentZoom=r.target.value}}}),e._v(" "),t("button",{staticClass:"zoom",on:{click:function(r){return e.$parent.zoom("+0.1")}}},[e._v("+")]),e._v(" "),t("p",[t("button",{staticClass:"zoom",on:{click:function(r){return e.$parent.zoom("height")}}},[e._v("Fit height")]),e._v(" "),t("button",{staticClass:"zoom",on:{click:function(r){return e.$parent.zoom("width")}}},[e._v("Fit width")]),e._v(" "),t("button",{staticClass:"zoom",on:{click:function(r){return e.$parent.zoom("reset")}}},[e._v("100 %")])])]),e._v(" "),e.$parent.isFeatureEnabled("Font")?t("details",{attrs:{open:""}},[e._m(2),e._v(" "),t("select",{staticClass:"font",on:{change:function(r){e.$parent.fontFamily=r.target.value}}},e._l(e.$parent.fontsAvailable,(function(r,o){return t("option",{key:o,style:{"font-size":"large","font-family":o},domProps:{value:o}},[e._v("\n          "+e._s(o)+"\n        ")])})),0)]):e._e()])])}),[function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"toggler-inner toggler-show"},[e._v("\n      >"),t("br"),e._v(">"),t("br"),e._v(">"),t("br"),e._v(">"),t("br"),e._v(">"),t("br"),e._v(">"),t("br"),e._v(">"),t("br"),e._v(">"),t("br"),e._v(">"),t("br")])},function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"toggler-inner toggler-hide"},[e._v("\n      <"),t("br"),e._v("<"),t("br"),e._v("<"),t("br"),e._v("<"),t("br"),e._v("<"),t("br"),e._v("<"),t("br"),e._v("<"),t("br"),e._v("<"),t("br"),e._v("<"),t("br")])},function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("summary",[e._v("Font: "),t("span",{staticClass:"font"})])}],!1,null,null,null).exports,i={features:{disableEmStrong:{enabled:!1},contentEditable:{enabled:!1},tooltips:{enabled:!0,styleId:"hocr-viewer-tooltip-style"},transparentText:{enabled:!1}}};function l(e,r){for(var t=0;t<r.length;t++){var o=r[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var c=function(){function r(e){var t=e.imagePrefix,o=void 0===t?"":t;!function(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}(this,r),this.imagePrefix=o}var t,o;return t=r,(o=[{key:"apply",value:function(r){var t=this,o=e.HocrDOM.queryHocr(r,"page");e.HocrDOM.queryHocrAll(r,{title:"image"}).forEach((function(r){var n=e.HocrDOM.getHocrProperties(r).image;o.style.backgroundImage="url(".concat(t.imagePrefix).concat(n,")")}))}}])&&l(t.prototype,o),r}();function s(e,r){for(var t=0;t<r.length;t++){var o=r[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var h=function(){function r(){!function(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}(this,r)}var t,o;return t=r,(o=[{key:"$emit",value:function(){for(var e=arguments.length,r=new Array(e),t=0;t<e;t++)r[t]=arguments[t];console.log({args:r})}},{key:"apply",value:function(r){var t=this;e.HocrDOM.queryHocrAll(r,{class:["line","x_word"],clauses:""}).forEach((function(e){e.setAttribute("contentEditable","true"),e.addEventListener("input",(function(){return t.$emit("contentEdited",e)}))}))}}])&&s(t.prototype,o),r}();function u(e,r){for(var t=0;t<r.length;t++){var o=r[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var f=function(){function e(){!function(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}(this,e)}var r,t;return r=e,t=[{key:"removeCssFragment",value:function(e,r){var t=document.querySelector("#".concat(e));t&&t.remove()}},{key:"addCssFragment",value:function(e,r){var t=document.querySelector("#".concat(e));t||((t=document.createElement("style")).id=e,document.head.appendChild(t)),t.appendChild(document.createTextNode(r))}}],null&&u(r.prototype,null),t&&u(r,t),e}();function g(e,r){for(var t=0;t<r.length;t++){var o=r[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function p(e,r){for(var t=0;t<r.length;t++){var o=r[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function d(e,r){for(var t=0;t<r.length;t++){var o=r[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function v(e,r){for(var t=0;t<r.length;t++){var o=r[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function b(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,o=new Array(r);t<r;t++)o[t]=e[t];return o}function m(e,r){for(var t=0;t<r.length;t++){var o=r[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}const y={BackgroundImage:c,ContentEditable:h,Font:function(){function r(e){var t=e.fontFamily,o=void 0===t?"x":t,n=e.fontsAvailable;!function(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}(this,r),this.fontFamily=o;var a="hocr-view-font-styles";f.removeCssFragment(a),Object.keys(n).forEach((function(e){var r=n[e].cssUrl;r&&f.addCssFragment(a,'@import "'.concat(r,'";\n'))}))}var t,o;return t=r,(o=[{key:"apply",value:function(r){var t=this;e.HocrDOM.queryHocrAll(r).forEach((function(e){e.style.fontFamily=t.fontFamily}))}}])&&g(t.prototype,o),r}(),HighlightBlank:function(){function r(){!function(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}(this,r)}var t,o;return t=r,(o=[{key:"apply",value:function(r){e.HocrDOM.queryHocrAll(r).forEach((function(e){""===e.innerHTML.trim()&&e.classList.add("hocrjs-blank")}))}}])&&p(t.prototype,o),r}(),Layout:function(){function r(){!function(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}(this,r)}var t,o;return t=r,(o=[{key:"apply",value:function(r){e.HocrDOM.queryHocrAll(r,{title:"bbox"}).forEach((function(r){var t=e.HocrDOM.getHocrProperties(r).bbox;t&&(r.style.position="fixed",r.style.left=t[0]+"px",r.style.top=t[1]+"px",r.style.width=t[2]-t[0]+1+"px",r.style.height=t[3]-t[1]+1+"px")}))}}])&&d(t.prototype,o),r}(),ScaleFont:function(){function r(e){var t=e.fontFamily,o=void 0===t?"x":t;e.fonts,function(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}(this,r),this.fontFamily=o,this.minFontSize=2,this.wrapClass="hocr-viewer-wrap",this.wrap={}}var t,o;return t=r,(o=[{key:"apply",value:function(r){var t=this;console.time("toggleScaleFont"),this.wrap=document.createElement("span"),this.wrap.classList.add(this.wrapClass),document.body.appendChild(this.wrap),e.HocrDOM.queryHocrAll(r,{terminal:!0}).forEach((function(e){return t.scaleFont(e)})),this.wrap.remove(),console.timeEnd("toggleScaleFont")}},{key:"scaleFont",value:function(e){var r=e.textContent.trim();if(0!==r.length){this.wrap.style.fontFamily=e.style.fontFamily,this.wrap.innerHTML=r;var t=parseInt(e.style.height.replace("px","")),o=parseInt(e.style.width.replace("px","")),n=t;if(n>this.minFontSize){this.wrap.style.fontSize=n+"px";var a=n*t/this.wrap.offsetHeight,i=n*o/this.wrap.offsetWidth;n=a<i?a:i}n<this.minFontSize&&(n=this.minFontSize),e.style.fontSize=n+"px"}}}])&&v(t.prototype,o),r}(),Tooltip:function(){function r(){!function(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}(this,r),this.styleId="hocr-viewer-tooltip-style"}var t,o;return t=r,(o=[{key:"apply",value:function(r){var t,o={},n=function(e,r){var t;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(t=function(e,r){if(e){if("string"==typeof e)return b(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?b(e,r):void 0}}(e))||r&&e&&"number"==typeof e.length){t&&(e=t);var o=0,n=function(){};return{s:n,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,l=!1;return{s:function(){t=e[Symbol.iterator]()},n:function(){var e=t.next();return i=e.done,e},e:function(e){l=!0,a=e},f:function(){try{i||null==t.return||t.return()}finally{if(l)throw a}}}}(e.HocrDOM.queryHocrAll(r));try{for(n.s();!(t=n.n()).done;)o[t.value.getAttribute("class")]=!0}catch(e){n.e(e)}finally{n.f()}console.log("Detected OCR classes",Object.keys(o)),f.removeCssFragment(this.styleId),f.addCssFragment(this.styleId,Object.keys(o).map((function(e){return".".concat(e,':hover::before { content: "').concat(e,'"; }\n')})).join("\n"))}}])&&m(t.prototype,o),r}()},w={name:"HocrViewer",components:{HocrToolbar:a},props:{hocr:{type:String,required:!0},initialZoom:{type:Number,default:1},featureBackgroundImage:{type:Boolean,default:!0},featureContentEditable:{type:Boolean,default:!0},featureFont:{type:Boolean,default:!0},featureLayout:{type:Boolean,default:!0},featureScaleFont:{type:Boolean,default:!1},featureTransparentText:{type:Boolean,default:!1},featureTooltip:{type:Boolean,default:!1},featureHighlight:{type:Boolean,default:!0},featureHighlightPage:{type:Boolean,default:!1},featureHighlightNotPage:{type:Boolean,default:!1},featureHighlightBlank:{type:Boolean,default:!0},featureHighlightInlineNotBlank:{type:Boolean,default:!0},featureHighlightInlineBlank:{type:Boolean,default:!1},featureHighlightLine:{type:Boolean,default:!0},featureHighlightPar:{type:Boolean,default:!0},featureHighlightCarea:{type:Boolean,default:!0},featureDisableEmStrong:{type:Boolean,default:!0},enableToolbar:{type:Boolean,default:!0},expandToolbar:{type:Boolean,default:!0},imagePrefix:{type:String,default:""},font:{type:String,default:"sans-serif"},fontsAvailable:{type:Object,default:function(){return{"sans-serif":{},serif:{},monospace:{},UnifrakturCook:{cssUrl:"https://fonts.googleapis.com/css?family=UnifrakturCook:700"},UnifrakturMaguntia:{cssUrl:"https://fonts.googleapis.com/css?family=UnifrakturMaguntia"},"Old Standard TT":{cssUrl:"https://fonts.googleapis.com/css?family=Old+Standard+TT"},Cardo:{cssUrl:"https://fonts.googleapis.com/css?family=Cardo"},"Noto Serif":{cssUrl:"https://fonts.googleapis.com/css?family=Noto+Serif:400,400i,700&subset=latin-ext"},"Libre Baskerville":{cssUrl:"https://fonts.googleapis.com/css?family=Libre+Baskerville:400,400i,700&subset=latin-ext"}}}}},data:function(){var e=this;return{enableLayout:!1,currentPageIdx:0,config:i,featuresEnabled:Object.keys(this.$props).filter((function(r){return r.startsWith("feature")&&e[r]})).map((function(e){return e.replace("feature","")})),fontFamily:this.font,currentZoom:this.initialZoom}},computed:{classList:function(){var e={"hocr-viewer":!0,"hocr-viewer-toolbar-enabled":this.enableToolbar};return this.featuresEnabled.map((function(r){return e["hocr-viewer-feature-".concat(r)]=!0})),e},lastPageIdx:function(){return e.HocrDOM.queryHocrAll(this.shadowDom,"page").length-1},currentPage:function(){console.log("enter currentPage");var r=e.HocrDOM.queryHocrAll(this.shadowDom,"page");return r.length?r[this.currentPageIdx]:(console.warn("No .ocr_page element found. Is this hOCR?"),{})},containerStyle:function(){var r=this.currentPage,t=e.HocrDOM.getHocrProperties(e.HocrDOM.queryHocr(r)).bbox,o=t[3]-t[1]+1;return{transform:"scale(".concat(this.currentZoom,")"),"transform-origin":"top left",height:"".concat(o,"px")}},featuresAvailable:function(){var e={};return Object.keys(this.$props).filter((function(e){return e.startsWith("feature")})).map((function(e){return e.replace("feature","")})).map((function(r){r in e||(e[r]=!0)})),Object.assign(e,y),e},features:function(){var e=this,r={};return Object.keys(y).map((function(t){if(e.featuresEnabled.includes(t)){var o=y[t];r[t]="function"!=typeof o||new o(e)}})),r},shadowDom:function(){console.log("enter shadowDom");var e=document.createElement("div");return e.innerHTML=this.hocr,e},hocrDom:function(){var e=this,r=document.createElement("div");return r.innerHTML=this.currentPage.outerHTML,Object.keys(this.features).map((function(t){e.features[t].apply&&e.features[t].apply(r)})),r},currentZoomRounded:function(){return Math.floor(1e4*this.currentZoom)/100}},mounted:function(){this.zoom("height")},methods:{prevPage:function(){this.currentPageIdx=Math.max(this.currentPageIdx-1,0)},nextPage:function(){this.currentPageIdx=Math.min(this.currentPageIdx+1,this.lastPageIdx)},isFeatureEnabled:function(e){return this.featuresEnabled.includes(e)},toggleFeature:function(e){this.isFeatureEnabled(e)?this.featuresEnabled.splice(this.featuresEnabled.indexOf(e),1):this.featuresEnabled.push(e)},zoom:function(r){var t=this.$el.querySelector(".hocr-viewer-container"),o=e.HocrDOM.getHocrProperties(e.HocrDOM.queryHocr(t)).bbox;"string"==typeof r&&("height"===r?r=window.innerHeight/o[3]:"width"===r?r=window.innerWidth/o[2]:"reset"===r?r=1:r.match(/^[+-]/)?r=this.currentZoom+parseFloat(r):console.error("Bad scaleFactor: '".concat(r,"'"))),this.currentZoom=r,this.$emit("scale-to",this.config.scaleFactor)}}};t(292);const _=n(w,(function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{class:e.classList},[e.enableToolbar?t("hocr-toolbar",{attrs:{expandedInitial:e.expandToolbar}}):e._e(),e._v(" "),t("div",{staticClass:"hocr-viewer-container",style:e.containerStyle,domProps:{innerHTML:e._s(e.hocrDom.innerHTML)}})],1)}),[],!1,null,null,null).exports;var x=t(892),k=t(524);const H={HocrViewer:_,HocrViewerStyle:x.Z,HocrToolbar:a,HocrToolbarStyle:k.Z}})(),o})()}));