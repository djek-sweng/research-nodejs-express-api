# Research Node.js Express API

In this repository I researched Node.js and Express for API backend development.

## Tech-Facts

Backend (server):

- Express (Web Framework)
- Restful API
- MongoDB (Database)
- Mongoose (ODM)
- Socket.IO (Websocket)
- GraphQL (Query Language)
- Authorization Bearer (JWT)
- bcryptjs
- Compression
- Input Validation
- Pagination
- Morgan (Request Logging)
- Helmet (Secure Header)
- CORS Headers
- dotenv
- Mocha Tests

Frontent (client):

- [Minimal Client](./src/client/minimal/index.html)
- [Postman Client](./src/client/postman/research-nodejs-express-api.postman_collection.json)

## Start Node.js Express API

Install modules, run linter, test, and application:

```sh
cd ./src/server

# clean
rm -rf node_modules

# install
npm install

# run linter
npm run lint

# run tests
npm run test

# run api
npm run start
npm run start:dev
```

## Run MongoDB inside Docker

```sh
cd ./tools/docker/mongo

docker compose up --remove-orphans -d
```

### Connection String

mongodb://root:pasSworD@localhost:27017

### Open Mongo Express Admin-Tool

http://localhost:8081/

basicAuth credentials are "admin:pass"

## Toolchain Requirements and Versions

```sh
node --version
  v20.9.0

npm --version
  10.2.4

nvm --version
  0.39.5

docker --version
  Docker version 24.0.7, build afdd53b

code --version
  1.85.2

  Useful extensions:
    mongodb.mongodb-vscode
    dbaeumer.vscode-eslint
    esbenp.prettier-vscode
    editorconfig.editorconfig
    pkief.material-icon-theme
```
