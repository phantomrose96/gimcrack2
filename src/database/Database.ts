import {
  Connection,
  IDatabaseDriver,
  MikroORM,
} from '@mikro-orm/core';
import microConfig from '../mikro-orm.config';

export type ORM = MikroORM<IDatabaseDriver<Connection>>;
export let GLOBALORM: ORM | undefined;

export async function initORM(): Promise<ORM> {
  GLOBALORM = await MikroORM.init(microConfig);
  if (GLOBALORM === undefined) {
    throw new Error('GLOBALORM undefined');
  }
  const migrator = await GLOBALORM.getMigrator();

  return new Promise((resolve, reject) => {
    migrator
      .up()
      .then(() => {
        if (GLOBALORM === undefined) {
          throw new Error('GLOBALORM undefined');
        }
        resolve(GLOBALORM);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
}

export async function getORM(): Promise<ORM> {
  if (!GLOBALORM) {
    return Promise.resolve(initORM());
  }
  return Promise.resolve(GLOBALORM);
}

// npx mikro-orm migration:create
