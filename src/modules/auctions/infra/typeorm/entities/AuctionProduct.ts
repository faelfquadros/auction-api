/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";

import { Product } from "@modules/products/infra/typeorm/entities/Product";

import { Auction } from "./Auction";

@Entity("auctions_products")
export class AuctionProduct {
  constructor() {}

  @PrimaryColumn()
  id?: string;

  @ManyToOne(() => Auction)
  @JoinColumn({ name: "auction_id" })
  auction: Auction;

  @Column()
  auction_id: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: "product_id" })
  product: Product;

  @Column()
  product_id: string;

  @CreateDateColumn()
  created_at: Date;
}
