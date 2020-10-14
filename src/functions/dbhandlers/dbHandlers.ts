import { MillInADay } from '../../strings/MillInADay';
import { getORM, ORM } from '../../database/Database';
import { Record } from '../../database/Record';

export async function createEntry(userid: string): Promise<Record> {
  const orm = await getORM();

  const newEntry = orm.em.create(Record, {
    userID: userid,
    balance: 10,
    timestamp: new Date(),
  });

  await orm.em.persistAndFlush(newEntry);

  return Promise.resolve(newEntry);
}

async function fetchEntry(
  userid: string,
  orm: ORM,
): Promise<Record | null> {
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
): Promise<Record> {
  const orm = await getORM();
  let foundEntry = await fetchEntry(userid, orm);

  if (!foundEntry) {
    foundEntry = await createEntry(userid);
  }

  return Promise.resolve(foundEntry);
}

///

export async function updateBalance(
  record: Record,
  delta: number,
): Promise<number> {
  const orm = await getORM();
  record.balance += delta;

  await orm.em.persistAndFlush(record);

  return Promise.resolve(getBalance(record));
}

async function updateTimeStamp(
  record: Record,
  newTimeStamp: Date,
): Promise<number> {
  const orm = await getORM();

  record.timestamp = newTimeStamp;

  await orm.em.persistAndFlush(record);
  return Promise.resolve(getBalance(record));
}

export async function getBalance(record: Record): Promise<number> {
  return Promise.resolve(record.balance);
}

export async function updateDailies(record: Record): Promise<number> {
  const nowTime = new Date();
  const diff = nowTime.getTime() - record.timestamp.getTime();
  if (diff > MillInADay) {
    await updateTimeStamp(record, nowTime);
    return Promise.resolve(updateBalance(record, 50));
  } else {
    const cooldownHours = (MillInADay - diff) / 1000 / 3600;
    return Promise.resolve(-cooldownHours);
  }
}
