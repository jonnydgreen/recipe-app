.PHONY: clean
clean:
	@rm -rf node_modules
	@rm -rf api/node_modules
	@rm -rf api/dist
	@rm -rf ui/node_modules
	@rm -rf ui/build
	@rm -rf ui/.cache
	@rm -rf ui/node_modules
	@rm -rf e2d/node_modules

.PHONY: install
install:
	npm install

.PHONY: docker
docker:
	docker compose up

.PHONY: test
test:
	(cd e2e && npm run e2e)

.PHONY: gen
gen:
	(npm run gen)