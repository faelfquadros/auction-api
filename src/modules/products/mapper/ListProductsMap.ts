import { instanceToInstance } from "class-transformer";

import { IResponse } from "../../../@types/src/modules/products/useCases/listProducts";
import { Product } from "../infra/typeorm/entities/Product";

class ListProductsMap {
  static toResponse(products: Product[]): IResponse[] {
    const productsMapped = [];
    Promise.all(
      products.map((product) => {
        const productMapped = instanceToInstance({
          id: product.id,
          name: product.name,
          description: product.description,
          owner_user_id: product.owner_user_id,
        });
        return productsMapped.push(productMapped);
      })
    );

    return productsMapped;
  }
}

export { ListProductsMap };
