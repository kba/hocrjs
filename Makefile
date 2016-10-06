PATH := $(PWD)/node_modules/.bin:$(PATH)
MKDIR = mkdir -p
WGET = wget
SASS = sass -t expanded --sourcemap=inline
CAT_SOURCE_MAP = cat-source-map

dist: \
	dist/normalize.css \
	dist/hocr-viewer.css \
	dist/hocr-parser.js \
	dist/hocr-viewer.js \
	dist/hocr-viewer-fullscreen.js \
	dist/hocr-viewer.user.js

dist/hocr-viewer.css: sass/hocr-viewer.scss
	$(MKDIR) dist
	$(SASS) $< > $@

dist/hocr-parser.js: LICENSE.js js/parser.js
	$(MKDIR) dist
	$(CAT_SOURCE_MAP) $^ $@

dist/hocr-viewer.js: LICENSE.js js/parser.js js/viewer.js
	$(MKDIR) dist
	$(CAT_SOURCE_MAP) $^ $@

dist/hocr-viewer-fullscreen.js: LICENSE.js js/parser.js js/viewer.js js/fullscreen-init.js
	$(MKDIR) dist
	$(CAT_SOURCE_MAP) $^ $@

dist/hocr-viewer.user.js: userscript/hocr-viewer.user.js
	sed "s/__DATE__/`date +'%s'`/" $< > $@

##
## Dependencies
##

dist/normalize.css:
	$(WGET) -O$@ 'https://github.com/necolas/normalize.css/raw/master/normalize.css'

LICENSE.js: LICENSE
	sed -e '1i /*!' -e '$$a */' $< > $@

##
## Utility targets
##

watch:
	while true;do \
		nodemon --exec "make dist" -w js -w less -e 'js less'; \
		sleep 10; \
	done
