import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { Product } from "@modules/products/infra/typeorm/entities/Product";

@Entity("auctions")
export class Auction {
  constructor() {
    if (!this.id) {
      this.id = uuidv4();
      this.finalized = false;
    }
  }

  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  finalized: boolean;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToMany(() => Product)
  @JoinTable({
    name: "auctions_products",
    joinColumn: { name: "auction_id" },
    inverseJoinColumn: { name: "product_id" },
  })
  products: Product[];
}
