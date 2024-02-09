/* eslint no-process-env: "off" */

// NOTE: All env vars from process.env are imported as STRINGS. It is important to keep this in mind and cast your env vars as needed.

import { injectEnv } from './libs/env';

injectEnv();

export const { NODE_ENV } = process.env;

export const APP_ENV = process.env.APP_ENV || 'local';
export const APP_MODE = process.env.APP_MODE || 'development';

export const PORT = process.env.PORT;

export const IS_PRODUCTION = APP_ENV === 'production';
export const IS_LOCAL = APP_ENV === 'local';
export const IS_TEST = APP_ENV === 'test';

// Envvars for default database connection
export const PGDATABASE = process.env.PGDATABASE;
export const PGHOST = process.env.PGHOST;
export const PGPORT = Number(process.env.PGPORT) || 5432;
export const PGUSER = process.env.PGUSER;
export const PGPASSWORD = process.env.PGPASSWORD;