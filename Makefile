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
	npx nodemon -e ts -w server -x 'NODE_ENV=development npm run build-backend && node dist/server/bin/index.js'

lint:
	npx eslint .
lint-fix:
	npx eslint --fix .

test:
	npm test
