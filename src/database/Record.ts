import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Record {
  @PrimaryKey()
  userID!: string;

  @Property({ default: 0 })
  balance: number;

  @Property({ type: 'date', default: 'new Date()' })
  timestamp: Date;

  @Property({ type: 'date', nullable: true })
  createdAt = new Date();

  @Property({
    type: 'date',
    nullable: true,
    onUpdate: () => new Date(),
  })
  updatedAt = new Date();
}
