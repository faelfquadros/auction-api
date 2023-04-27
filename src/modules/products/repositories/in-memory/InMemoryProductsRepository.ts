/* eslint-disable no-plusplus */
import { ICreateProductDTO } from "@modules/products/dtos/ICreateProductDTO";
import { Product } from "@modules/products/infra/typeorm/entities/Product";

import { IProductsRepository } from "../IProductsRepository";

class InMemoryProductsRepository implements IProductsRepository {
  products: Product[] = [];

  async create({
    name,
    description,
    owner_user_id,
  }: ICreateProductDTO): Promise<Product> {
    const product = new Product();

    Object.assign(product, {
      name,
      description,
      owner_user_id,
    });

    this.products.push(product);

    return product;
  }

  async listAllAvailableToSale(
    owner_user_id: string,
    name?: string,
    description?: string
  ): Promise<Product[]> {
    const products = this.products.filter((product) => {
      if (
        product.available_to_sale === true &&
        product.owner_user_id === owner_user_id &&
        (!name || product.name.includes(name)) &&
        (!description || product.description.includes(description))
      ) {
        return product;
      }
      return null;
    });

    return products;
  }

  async listByProducts(
    owner_user_id: string,
    products: string[]
  ): Promise<Product[]> {
    const productsList = this.products.filter(
      (p) => p.owner_user_id === owner_user_id && products.includes(p.id)
    );

    return productsList;
  }

  async listByAvailableProducts(
    owner_user_id: string,
    products: string[]
  ): Promise<Product[]> {
    const productsList = this.products.filter(
      (p) =>
        p.owner_user_id === owner_user_id &&
        p.available_to_sale === true &&
        products.includes(p.id)
    );

    return productsList;
  }

  async updateAvailableToSale(
    availableToSale: boolean,
    products: string[]
  ): Promise<void> {
    for (let i = 0; i < this.products.length; i++) {
      if (products.includes(this.products[i].id)) {
        this.products[i].available_to_sale = availableToSale;
      }
    }
  }

  async updateOwner(product_id: string, owner_user_id: string): Promise<void> {
    const productIndex = this.products.findIndex(
      (product) => product.id === product_id
    );

    if (productIndex !== -1) {
      this.products[productIndex].available_to_sale = true;
      this.products[productIndex].owner_user_id = owner_user_id;
    }
  }

  async listByName(name: string): Promise<Product> {
    const products = this.products.find((product) => product.name === name);

    return products;
  }
}

export { InMemoryProductsRepository };
