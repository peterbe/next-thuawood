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

lint:
    npm run lint

format:
    npm run format

install:
    npm install

upgrade:
    npx npm-check-updates --interactive

outdated:
    npm outdated
