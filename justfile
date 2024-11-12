# https://github.com/casey/just
# https://just.systems/

dev:
    npm run dev

build:
    npm run build

start: build
    npm run start

pretty:
    npm run pretty

tsc:
    npm run tsc

lint: pretty
    npm run lint
    npm run tsc

lintfix: prettyfix
    npm run lint:fix

prettyfix:
    npm run pretty:fix

format: prettyfix lintfix

install:
    npm install

outdated:
    npx npm-check-updates --interactive
