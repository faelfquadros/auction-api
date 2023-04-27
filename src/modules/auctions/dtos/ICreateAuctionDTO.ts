import { Product } from "@modules/products/infra/typeorm/entities/Product";

interface ICreateAuctionDTO {
  name: string;
  description: string;
  user_id: string;
  products?: Product[];
  id?: string;
}

export { ICreateAuctionDTO };
