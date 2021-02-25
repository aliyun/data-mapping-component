install:
	@(npm install) & (cd example && npm install) & wait

clean:
	@rm -rf node_modules example/node_modules
