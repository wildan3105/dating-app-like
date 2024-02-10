## Dating app like

## How to run

### System requirement

1. Node >= 18.0.0
2. NPM >= 9.5.0
3. Postgres >= 12.0.0

### Running locally

**Prerequisites**

1. Clone the project: `git clone git@github.com:wildan3105/dating-app-like.git`
2. Install dependencies: `npm i`
3. Copy the environment variable and adjust the value accordingly: `cp .env.example .env`
4. Create a postgre user and then database in which you have full access to that DB (could create extension). And then specify the credentials in the `.env` file

```bash
PGHOST='localhost'
PGPORT='5432'
PGUSER='postgres'
PGDATABASE='db'
PGPASSWORD='postgrespass123'
```

#### Using TypeScript

1. Run the server `npm run start` (it will watch any `TS` file changes and re-spawn it automatically)

#### Using JavaScript

1. Build to JS files: `npm run build`
2. Run the JS file: `node builds/src/server.js`

## Testing

### Code format

```bash
npm run format:check -> to check format
npm run format -> to automatically format the code
```

### Linter

```bash
npm run lint -> to check the lint error (prevent bugs early)
npm run lint:fix -> to fix the lint error if it's fixable
```

### Test

#### Integration test

Still WIP

#### Unit test (partial)

```bash
npm run test
```

#### Postman test

Still WIP

### Project structure

#### Folder tree

```md
├── docs
│   └── openapi.yaml
├── postman
├── src
│   ├── app.ts
│   ├── cmd
│   │   └── generate-error-map
│   │   ├── index.ts
│   │   └── schema-http-code.json
│   ├── config.ts
│   ├── controllers
│   │   ├── healthcheck.ts
│   │   ├── middlewares
│   │   │   ├── auth.ts
│   │   │   └── handle-error-code.ts
│   │   └── user.ts
│   ├── db-connect.ts
│   ├── domain
│   │   ├── errors.ts
│   │   ├── standard-error.ts
│   │   ├── user-entity.ts
│   │   ├── user-login.ts
│   │   └── user-verification-code-entity.ts
│   ├── events
│   │   ├── index.ts
│   │   └── listeners
│   │   └── user-event.ts
│   ├── init.ts
│   ├── interfaces
│   │   ├── user-verification-code.ts
│   │   └── user.ts
│   ├── libs
│   │   ├── env
│   │   │   └── index.ts
│   │   ├── sleep
│   │   │   └── index.ts
│   │   └── typeorm
│   │   ├── entities.ts
│   │   ├── migrations
│   │   │   ├── ... migration files
│   │   │   └── index.ts
│   │   ├── ormconfig-cli.ts
│   │   ├── ormconfig.ts
│   │   └── repository
│   │   ├── user-verification-code.ts
│   │   └── user.ts
│   ├── server.ts
│   ├── services
│   │   ├── external
│   │   │   └── email
│   │   │   ├── config.ts
│   │   │   ├── index.ts
│   │   │   ├── interface.ts
│   │   │   └── template.ts
│   │   ├── healthcheck.ts
│   │   └── user.ts
│   └── utils
│   └── index.ts
├── tests
│   ├── controllers
│   │   └── healthcheck.test.ts
│   └── utils
│   └── index.test.ts
```

#### Explanation

| Name                            | Description                                                                                                                           |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **docs/**                       | Store Open API spec.                                                                                                                  |
| **src/**                        | Source files.                                                                                                                         |
| **src/cmd/**                    | All CLI-based files are stored here. In this specific case, it will generate error code based on Open API definition.                 |
| **src/controllers/**            | REST API Controllers.                                                                                                                 |
| **src/controllers/middlewares** | Store middlewares that are used to intercept, validate, add data to request/response and or perform authentication to certain routes. |
| **src/domain**                  | Typescript classes to represent entities.                                                                                             |
| **src/events/**                 | Event listeners.                                                                                                                      |
| **src/interfaces/**             | A collection of interfaces, especially for HTTP request-response.                                                                     |
| **src/libs/env/**               | Library to inject environment variable from an `.env` file.                                                                           |
| **src/libs/sleep/**             | Library to add delay for a certain amount of time.                                                                                    |
| **src/libs/typeorm/**           | All functionalities with regard to type ORM (SQL migration files, ORM config, and repository layer).                                  |
| **src/services/**               | Service layer. Core business logics are stored here.                                                                                  |
| **src/utils/**                  | This directory contains utility functions for generating random codes and validating strings against specific rules                   |
| **tests/**                      | Test directory for both unit and integration tests.                                                                                   |
