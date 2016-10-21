PATH := $(PWD)/node_modules/.bin:$(PATH)
MKDIR = @mkdir -p
WGET = wget
SASS = sass -t expanded --sourcemap=inline
CAT_SOURCE_MAP = cat-source-map

SERVER = https://kba.github.io/hocrjs/dist
PORT = 8888

CSS_TARGETS = \
	dist/normalize.css \
	dist/hocr-viewer.css

JS_TARGETS = \
	dist/hocr-parser.js \
	dist/hocr-viewer.js \
	dist/hocr-viewer-fullscreen.js \
	dist/hocr-viewer.user.js

dist: $(JS_TARGETS) $(CSS_TARGETS)

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
	sed -e "s/__DATE__/`date +'%s'`/" \
		-e "s,__SERVER__,$(SERVER)," \
		$< > $@

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
		nodemon --exec "make dist" -w js -w sass/ -e 'js scss'; \
		sleep 10; \
	done

clean:
	$(RM) -r $(JS_TARGETS)

server:
	$(MAKE) clean
	$(MAKE) SERVER=http://localhost:$(PORT)/dist
	python2 -m SimpleHTTPServer $(PORT)
