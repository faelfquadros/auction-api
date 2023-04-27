import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { User } from "@modules/accounts/infra/typeorm/entities/User";

@Entity("products")
export class Product {
  constructor() {
    if (!this.id) {
      this.id = uuidv4();
      this.available_to_sale = true;
    }
  }

  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  available_to_sale: boolean;

  @OneToOne(() => User)
  @JoinColumn({ name: "owner_user_id" })
  user: User;

  @Column()
  owner_user_id: string;

  @CreateDateColumn()
  created_at: Date;
}
