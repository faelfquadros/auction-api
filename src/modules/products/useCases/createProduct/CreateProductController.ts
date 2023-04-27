import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateProductUseCase } from "./CreateProductUseCase";

class CreateProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;
    const { id: owner_user_id } = req.user;

    const createProductUseCase = container.resolve(CreateProductUseCase);

    const product = await createProductUseCase.execute({
      name,
      description,
      owner_user_id,
    });

    return res.status(201).json(product);
  }
}

export { CreateProductController };
