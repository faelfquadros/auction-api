import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAuctionsProductsBids1682463913943
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "auctions_products_bids",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "auction_product_id",
            type: "uuid",
          },
          {
            name: "user_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "value",
            type: "numeric",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FK_auction_product_id",
            columnNames: ["auction_product_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "auctions_products",
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
          {
            name: "FK_user_id",
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "auctions_products_bids",
      "FK_auction_product_id"
    );
    await queryRunner.dropForeignKey("auctions_products_bids", "FK_user_id");
    await queryRunner.dropTable("auctions_products_bids");
  }
}
