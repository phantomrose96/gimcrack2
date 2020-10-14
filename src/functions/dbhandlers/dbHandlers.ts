import { MillInADay } from '../../strings/MillInADay';
import { getORM, ORM } from '../../database/Database';
import { Record } from '../../database/Record';

export async function createEntry(userid: string): Promise<void> {
  const orm = await getORM();

  const newEntry = orm.em.create(Record, {
    userID: userid,
    balance: 10,
    timestamp: new Date(),
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

  return Promise.resolve(getBalance(userid));
}

async function updateTimeStamp(
  userid: string,
  newTimeStamp: Date,
): Promise<number> {
  const orm = await getORM();
  const foundEntry = await fetchEntry(userid, orm);

  foundEntry.timestamp = newTimeStamp;

  await orm.em.persistAndFlush(foundEntry);

  return Promise.resolve(getBalance(userid));
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
  if (diff > MillInADay) {
    await updateTimeStamp(userid, nowTime);
    return Promise.resolve(updateBalance(userid, 50));
  } else {
    const cooldownHours = (MillInADay - diff) / 1000 / 3600;
    return Promise.resolve(-cooldownHours);
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
