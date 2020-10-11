import { Record } from './database/Record';
import { MikroORM } from '@mikro-orm/core';
import path from 'path';

export default {
  migrations: {
    path: path.join(__dirname, './migrations'),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [Record],
  dbName: 'gimcrackDB',
  type: 'sqlite',
  user: 'phantomrose96',
  password: '',
} as Parameters<typeof MikroORM.init>[0];
