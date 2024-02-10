## Dating app like

## How to run

### System requirement

1. Node >= 18.0.0
2. NPM >= 9.5.0
3. Postgres >= 12.0.0

### Install

```bash
npm i
```

### Migration

Must be run once using this command:

```bash
npm run migration:run
```

### Running locally

#### Using Docker

#### Using Node

1. Using built JS files

```bash
npm run build && node builds/server.js
```

2. Using TS and watch mode (will re-spawn if there are `TS` file changes):

```bash
npm run start
```

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

```bash
npm run test
```
