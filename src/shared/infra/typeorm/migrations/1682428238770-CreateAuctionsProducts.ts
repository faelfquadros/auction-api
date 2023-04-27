import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAuctionsProducts1682428238770 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "auctions_products",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            default: "uuid_generate_v4()",
          },
          {
            name: "auction_id",
            type: "uuid",
          },
          {
            name: "product_id",
            type: "uuid",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FK_auction_id",
            columnNames: ["auction_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "auctions",
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
          {
            name: "FK_product_id",
            columnNames: ["product_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "products",
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("auctions_products", "FK_auction_id");
    await queryRunner.dropForeignKey("auctions_products", "FK_product_id");
    await queryRunner.dropTable("auctions_products");
  }
}
