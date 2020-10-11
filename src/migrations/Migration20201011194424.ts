import { Migration } from '@mikro-orm/migrations';

export class Migration20201011194424 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `record` (`user_id` varchar not null, `balance` integer not null default 0, `timestamp` datetime null default \'new Date()\', `created_at` datetime null, `updated_at` datetime null, primary key (`user_id`));');
  }

}
