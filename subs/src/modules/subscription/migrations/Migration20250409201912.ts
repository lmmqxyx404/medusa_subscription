import { Migration } from '@mikro-orm/migrations';

export class Migration20250409201912 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "subscription" ("id" text not null, "status" text check ("status" in ('active', 'canceled', 'expired', 'failed')) not null default 'active', "interval" text check ("interval" in ('monthly', 'yearly')) not null, "period" integer not null, "subscription_date" timestamptz not null, "last_order_date" timestamptz not null, "next_order_date" timestamptz null, "expiration_date" timestamptz not null, "metadata" jsonb null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "subscription_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_subscription_next_order_date" ON "subscription" (next_order_date) WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_subscription_expiration_date" ON "subscription" (expiration_date) WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_subscription_deleted_at" ON "subscription" (deleted_at) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "subscription" cascade;`);
  }

}
