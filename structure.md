## Project structure

.
├── README.md
├── docs
│   └── openapi.yaml
├── jest.config.ts
├── package-lock.json
├── package.json
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
│   │   │   ├── 1691117052407-create-user-table.ts
│   │   │   ├── 1707401199405-add-columns-to-user-table.ts
│   │   │   ├── 1707401600832-alter-email-type.ts
│   │   │   ├── 1707403380904-add-email-unique-constraint-and-is-active-column.ts
│   │   │   ├── 1707441732146-create-user-verification-code-table.ts
│   │   │   ├── 1707470430600-add-encrypted-password-to-user-table.ts
│   │   │   ├── 1707472539187-add-user-login-table.ts
│   │   │   ├── 1707516734946-rename-encrypted-password-column-in-user-table.ts
│   │   │   ├── 1707528202400-add-last-logout-at-column-to-user-table.ts
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
├── structure.md
├── tests
│   ├── controllers
│   │   └── healthcheck.test.ts
│   └── utils
│   └── index.test.ts
├── tsconfig.json
└── types.d.ts

2114 directories, 16642 files
