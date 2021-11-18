import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableIndex,
} from "typeorm";

export class AlterUserDeleteUsername1637277825001
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex("users", "UK_users_username");
    await queryRunner.dropColumn("users", "username");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "username",
        type: "varchar",
        length: "190",
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
}
