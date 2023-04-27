import { ICreateProductDTO } from "../dtos/ICreateProductDTO";
import { Product } from "../infra/typeorm/entities/Product";

interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  listAllAvailableToSale(
    owner_user_id: string,
    name?: string,
    description?: string
  ): Promise<Product[]>;
  listByProducts(owner_user_id: string, products: string[]): Promise<Product[]>;
  listByAvailableProducts(
    owner_user_id: string,
    products: string[]
  ): Promise<Product[]>;
  updateAvailableToSale(
    availableToSale: boolean,
    products: string[]
  ): Promise<void>;
  updateOwner(product_id: string, owner_user_id: string): Promise<void>;
  listByName(name: string): Promise<Product>;
}

export { IProductsRepository };
