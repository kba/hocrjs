PATH := $(PWD)/node_modules/.bin:$(PATH)

# Version of the latest git tag
VERSION = $(shell git describe --abbrev=0 --tags|sed -e 's/v//')

# URL of the asset server, serving the built files and userscript
ASSET_SERVER = https://unpkg.com/hocrjs@$(VERSION)/dist

# URL of the userscript update server (defaults to ASSET_SERVER)
UPDATE_SERVER = $(ASSET_SERVER)

# Command to run a static server
STATIC_SERVER = @python2 -m SimpleHTTPServer $(PORT)

# Server port. Default: 8888
PORT = 8888

# BEGIN-EVAL makefile-parser --make-help Makefile

help:
	@echo ""
	@echo "  Targets"
	@echo ""
	@echo "    dist   webpack"
	@echo "    clean  Remove built targets"
	@echo "    test   Run unit tests"
	@echo "    serve  Run a development server"
	@echo "    watch  Continuously rebuild dist"
	@echo ""
	@echo "  Variables"
	@echo ""
	@echo "    VERSION        Version of the latest git tag"
	@echo "    ASSET_SERVER   URL of the asset server, serving the built files and userscript"
	@echo "    UPDATE_SERVER  URL of the userscript update server (defaults to ASSET_SERVER)"
	@echo "    STATIC_SERVER  Command to run a static server"
	@echo "    PORT           Server port. Default: 8888"

# END-EVAL

# webpack
dist: dist/hocr.user.js
	webpack

dist/hocr.user.js: src/hocr.user.js
	mkdir -p $(dir $@)
	sed -e "s,__VERSION__,$(VERSION)," \
		-e "s,__ASSET_SERVER__,$(ASSET_SERVER)," \
		-e "s,__UPDATE_SERVER__,$(UPDATE_SERVER)," \
		$< > $@

# Remove built targets
clean:
	$(RM) -r ./dist

# Run unit tests
.PHONY: test
test:
	babel-tap test/*.test.js

# Run a development server
serve:
	$(MAKE) clean dist ASSET_SERVER=$(ASSET_SERVER)
	$(STATIC_SERVER)

# Continuously rebuild dist
watch:
	while true;do \
		nodemon --exec "make clean dist ASSET_SERVER=$(ASSET_SERVER)" \
			-w src \
			-e 'js scss html' \
			; sleep 5 || break; \
	done
