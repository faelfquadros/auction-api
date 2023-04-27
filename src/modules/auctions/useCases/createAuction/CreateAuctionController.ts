import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateAuctionUseCase } from "./CreateAuctionUseCase";

class CreateAuctionController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description, products } = req.body;
    const { id: user_id } = req.user;

    const createAuctionUseCase = container.resolve(CreateAuctionUseCase);

    const auction = await createAuctionUseCase.execute({
      name,
      description,
      user_id,
      products,
    });

    return res.status(201).json(auction);
  }
}

export { CreateAuctionController };
