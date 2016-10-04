PATH := $(PWD)/node_modules/.bin:$(PATH)
MKDIR = mkdir -p
WGET = wget
# LESSC = lessc --source-map --source-map-map-inline --include-path=less:. --clean-css
LESSC = lessc --source-map --source-map-map-inline --include-path=less
CAT_SOURCE_MAP = cat-source-map

dist: dist/hocr-viewer.css \
	dist/hocr-parser.js \
	dist/hocr-viewer.js \
	dist/hocr-viewer-fullscreen.js \
	dist/hocr-viewer.user.js

dist/hocr-viewer.css: less/hocr-viewer.less
	$(MKDIR) dist
	$(LESSC) $< $@

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

dist/reset.less:
	$(MKDIR) dist
	$(WGET) -O$@ 'https://github.com/necolas/normalize.css/raw/master/normalize.css'

dist/prefixer.less:
	$(MKDIR) dist
	$(WGET) -O$@ 'https://raw.githubusercontent.com/JoelSutherland/LESS-Prefixer/master/prefixer.less'

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
