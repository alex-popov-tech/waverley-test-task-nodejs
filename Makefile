setup: preparation dependency
dependency:
	rm -rf node_modules; npm ci
preparation:
	npm run preparation

build:
	npm run build
start:
	npm run start

dev:
	npx nodemon -e ts,pug -w server -x 'cp -r server/views dist/server/views; npx ts-node server/bin/index.ts'

lint:
	npx eslint .
lint-fix:
	npx eslint --fix .

test:
	npm test
