PATH := $(PWD)/node_modules/.bin:$(PATH)

# URL of the asset server, serving the built files and userscript
ASSET_SERVER = https://kba.github.io/hocrjs/dist

# URL of the userscript update server (defaults to ASSET_SERVER)
UPDATE_SERVER = $(ASSET_SERVER) 

LOCAL_SERVER = http://localhost:$(PORT)/dist

# Command to run a static server
STATIC_SERVER = @python2 -m SimpleHTTPServer $(PORT)

# Server port
PORT = 8888

# BEGIN-EVAL makefile-parser --make-help Makefile

help:
	@echo ""
	@echo "  Targets"
	@echo ""
	@echo "    watch  Continuously rebuild dist"
	@echo "    dist   webpack"
	@echo "    clean  Remove built targets"
	@echo "    serve  Run a development server"
	@echo "    test   Run unit tests"
	@echo ""
	@echo "  Variables"
	@echo ""
	@echo "    ASSET_SERVER   URL of the asset server, serving the built files and userscript"
	@echo "    UPDATE_SERVER  URL of the userscript update server (defaults to ASSET_SERVER)"
	@echo "    STATIC_SERVER  Command to run a static server"
	@echo "    PORT           Server port"

# END-EVAL

# webpack
dist: dist/hocr.user.js
	webpack

dist/hocr.user.js: src/userjs/hocr.user.js
	sed -e "s/__DATE__/`date +'%s'`/" \
		-e "s,__ASSET_SERVER__,$(ASSET_SERVER)," \
		-e "s,__UPDATE_SERVER__,$(UPDATE_SERVER)," \
		$< > $@

# Remove built targets
clean:
	$(RM) -r ./dist

# Run a development server
serve:
	$(MAKE) clean dist ASSET_SERVER=$(LOCAL_SERVER)
	$(STATIC_SERVER)

# Run unit tests
.PHONY: test
test:
	babel-tap test/*.test.js

# Continuously rebuild dist
watch:
	while true;do \
		nodemon --exec "make clean dist ASSET_SERVER=$(LOCAL_SERVER)" \
			-w js -w sass/ \
			-e 'js scss' \
			; sleep 5 || break; \
	done
