import { getORM, ORM } from '../../database/Database';
import { Record } from '../../database/Record';

export async function createEntry(userid: string): Promise<void> {
  const orm = await getORM();
  const newEntry = orm.em.create(Record, {
    userID: userid,
    balance: 10,
  });

  const result = await orm.em.persistAndFlush(newEntry);

  return Promise.resolve(result);
}

export async function updateBalance(
  userid: string,
  delta: number,
): Promise<number> {
  const orm = await getORM();
  const foundEntry = await fetchEntry(userid, orm);

  foundEntry.balance += delta;

  await orm.em.persistAndFlush(foundEntry);

  return Promise.resolve(delta);
}

export async function getBalance(userid: string): Promise<number> {
  const orm = await getORM();
  const foundEntry = await fetchEntry(userid, orm);

  return Promise.resolve(foundEntry.balance);
}

export async function updateDailies(userid: string): Promise<number> {
  const orm = await getORM();
  const foundEntry = await fetchEntry(userid, orm);

  const nowTime = new Date();
  const diff = nowTime.getTime() - foundEntry.timestamp.getTime();
  if (diff > 86400 * 1000) {
    return Promise.resolve(updateBalance(userid, 50));
  } else {
    return Promise.resolve(-1);
  }
}

async function fetchEntry(userid: string, orm: ORM): Promise<Record> {
  const foundEntry = await orm.em.find(Record, {
    userID: userid,
  });

  if (foundEntry && foundEntry.length >= 1) {
    return Promise.resolve(foundEntry[0]);
  }
  return Promise.reject(new Error('not found'));
}

export async function checkAndCreateAccount(
  userid: string,
): Promise<boolean> {
  const orm = await getORM();
  const foundEntry = await orm.em.find(Record, {
    userID: userid,
  });

  if (!foundEntry || foundEntry.length === 0) {
    await createEntry(userid);
    return Promise.resolve(true);
  }

  return Promise.resolve(true);
}
