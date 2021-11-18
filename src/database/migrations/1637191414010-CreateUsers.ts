import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateUsers1637191414010 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
            generationStrategy: "uuid",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "username",
            type: "varchar",
            // isUnique: true,
            length: "190",
          },
          {
            name: "password",
            type: "varchar",
          },
          {
            name: "email",
            type: "varchar",
          },
          {
            name: "driver_licence",
            type: "varchar",
          },
          {
            name: "isAdmin",
            type: "boolean",
            default: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );

    await queryRunner.createIndex(
      "users",
      new TableIndex({
        name: "UK_users_username",
        columnNames: ["username"],
        isUnique: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex("users", "UK_users_username");
    await queryRunner.dropTable("users");
  }
}
