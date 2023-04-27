import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { User } from "@modules/accounts/infra/typeorm/entities/User";

import { AuctionProduct } from "./AuctionProduct";

@Entity("auctions_products_bids")
export class AuctionProductBid {
  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }

  @PrimaryColumn()
  id?: string;

  @ManyToOne(() => AuctionProduct)
  @JoinColumn({ name: "auction_product_id" })
  auctionProduct: AuctionProduct;

  @Column()
  auction_product_id: string;

  @ManyToMany(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  user_id: string;

  @Column()
  value: number;

  @CreateDateColumn()
  created_at: Date;
}
