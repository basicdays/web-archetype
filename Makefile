PATH := bin:node_modules/.bin:venv/bin:$(PATH)
build := build/
assets := $(shell find ./assets -type f)


build: node_modules
	@webpack

node_modules: package.json
	@npm install
	@touch node_modules

# testing
lint: node_modules
	@eslint .
	@jscs .


# misc tasks
run: build
	@webpack-dev-server --inline --hot

clean:
	@rm -rf $(build)

maintainerclean: clean
	@rm -rf node_modules


.PHONY: lint run clean maintainerclean
