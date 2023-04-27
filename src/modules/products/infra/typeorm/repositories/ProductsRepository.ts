import { Repository, getRepository } from "typeorm";

import { ICreateProductDTO } from "@modules/products/dtos/ICreateProductDTO";
import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";

import { Product } from "../entities/Product";

class ProductsRepository implements IProductsRepository {
  constructor() {
    this.repository = getRepository(Product);
  }

  private repository: Repository<Product>;

  async create({
    name,
    description,
    owner_user_id,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.repository.create({
      name,
      description,
      owner_user_id,
    });

    await this.repository.save(product);

    return product;
  }

  async listAllAvailableToSale(
    owner_user_id: string,
    name?: string,
    description?: string
  ): Promise<Product[]> {
    const productsQuery = this.repository
      .createQueryBuilder("p")
      .where("available_to_sale = :available_to_sale", {
        available_to_sale: true,
      })
      .andWhere("owner_user_id = :owner_user_id", { owner_user_id });

    if (name) {
      productsQuery.andWhere("p.name like :name", { name: `%${name}%` });
    }

    if (description) {
      productsQuery.andWhere("p.description like :description", {
        description: `%${description}%`,
      });
    }

    const productsList = await productsQuery.getMany();

    return productsList;
  }

  async listByProducts(
    owner_user_id: string,
    products: string[]
  ): Promise<Product[]> {
    const productsList = await this.repository
      .createQueryBuilder()
      .where("id IN (:...products)", { products })
      .andWhere({ owner_user_id })
      .getMany();

    return productsList;
  }

  async listByAvailableProducts(
    owner_user_id: string,
    products: string[]
  ): Promise<Product[]> {
    const productsList = await this.repository
      .createQueryBuilder()
      .where("id IN (:...products)", { products })
      .andWhere("available_to_sale = true")
      .andWhere({ owner_user_id })
      .getMany();

    return productsList;
  }

  async updateAvailableToSale(
    availableToSale: boolean,
    products: string[]
  ): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available_to_sale: availableToSale })
      .where("id IN (:...products)", { products })
      .execute();
  }

  async updateOwner(product_id: string, owner_user_id: string): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({
        available_to_sale: true,
        owner_user_id,
      })
      .where({ id: product_id })
      .execute();
  }

  async listByName(name: string): Promise<Product> {
    const products = await this.repository.findOne({ name });

    return products;
  }
}

export { ProductsRepository };
