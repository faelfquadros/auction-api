import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAvailableProductsToSaleUseCase } from "./ListAvailableProductsToSaleUseCase";

class ListAvailableProductsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.query;
    const { id: owner_user_id } = req.user;

    const listAvailableProductsUseCase = container.resolve(
      ListAvailableProductsToSaleUseCase
    );

    const productsList = await listAvailableProductsUseCase.execute({
      name: name as string,
      description: description as string,
      owner_user_id,
    });

    return res.json(productsList);
  }
}

export { ListAvailableProductsController };
