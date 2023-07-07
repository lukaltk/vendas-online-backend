import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableUser1688754101219 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        alter table public.user add unique(email);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    `);
  }
}
