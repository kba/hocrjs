PATH := $(PWD)/node_modules/.bin:$(PATH)

# BEGIN-EVAL makefile-parser --make-help Makefile

help:
	@echo ""
	@echo "  Targets"
	@echo ""
	@echo "    dist   webpack for vue component"
	@echo "    watch  webpack for vue component continuously"
	@echo "    clean  rm dist"
	@echo ""
	@echo "  Variables"
	@echo ""

# END-EVAL

# webpack for vue component
dist:
	webpack

# webpack for vue component continuously
watch:
	webpack -w

# rm dist
clean:
	rm -fr dist
