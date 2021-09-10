import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class addTasks1630245499736 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'tasks',
        columns: [
          {
            name: 'id',
            type: 'integer', // instead of 'int', required for the increment strategy
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment' // thought this was the default
          }, {
            name: 'name',
            type: 'varchar'
          }, {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          }, {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('tasks');
    }

}
