## Dating app like

## How to run

### System requirement

1. Node >= 18.0.0
2. NPM >= 9.5.0
3. Postgres >= 12.0.0

### Running locally

**Prerequisites**

1. Clone the project: `git clone https://github.com/wildan3105/dating-app-like.git`
2. Install dependencies: `npm i`
3. Run the migration file: `npm run migration:run`
4. Use the correct environment variable `.env`. Please copy from [this template](.env.example)

#### Using TS

1. Run the server `npm run start` (it will watch any `TS` file changes and re-spawn it automatically)

#### Using JS

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
