setup: preparation dependency
dependency:
	rm -rf node_modules; npm ci
preparation:
	npm run preparation

migration-run:
	npm run typeorm -- migration:run
migration-drop:
	npm run typeorm -- schema:drop

build:
	npm run build
start:
	npm run start

dev:
	npx nodemon -e ts,pug -w services/backend -x 'cp -r services/backend/src/api/views dist/backend/views; npx ts-node --project services/backend/tsconfig.json services/backend/src/api/bin/index.ts'

lint:
	npx eslint .
lint-fix:
	npx eslint --fix .

test:
	npm test
