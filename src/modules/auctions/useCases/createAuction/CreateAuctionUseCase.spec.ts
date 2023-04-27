import { AppError } from "@shared/errors/AppError";

import { IResponse } from "../../../../@types/src/modules/auctions/useCases/createAuction";
import { InMemoryProductsRepository } from "../../../products/repositories/in-memory/InMemoryProductsRepository";
import { CreateProductUseCase } from "../../../products/useCases/createProduct/CreateProductUseCase";
import { InMemoryAuctionsRepository } from "../../repositories/in-memory/InMemoryAuctionsRepository";
import { CreateAuctionUseCase } from "./CreateAuctionUseCase";

let createAuctionUseCase: CreateAuctionUseCase;
let createProductUseCase: CreateProductUseCase;
let inMemoryProductsRepository: InMemoryProductsRepository;
let inMemoryAuctionsRepository: InMemoryAuctionsRepository;

const expected: IResponse = {
  id: expect.any(String),
  name: expect.any(String),
  description: expect.any(String),
  user_id: expect.any(String),
  products: expect.any(Array),
};

describe("Create auction", () => {
  beforeEach(() => {
    inMemoryAuctionsRepository = new InMemoryAuctionsRepository();
    inMemoryProductsRepository = new InMemoryProductsRepository();
    createAuctionUseCase = new CreateAuctionUseCase(
      inMemoryAuctionsRepository,
      inMemoryProductsRepository
    );
    createProductUseCase = new CreateProductUseCase(inMemoryProductsRepository);
  });

  it("should be able to create a new auction", async () => {
    const product = await createProductUseCase.execute({
      name: "Moeda",
      description: "Moeda de 1945",
      owner_user_id: "49d957ac-d452-4cc0-bfd6-a4a2ab784424",
    });

    const auction = await createAuctionUseCase.execute({
      name: "First Auction",
      description: "Auction to sell antiques",
      user_id: "49d957ac-d452-4cc0-bfd6-a4a2ab784424",
      products: [product.id],
    });

    expect(auction).toMatchObject(expected);
  });

  it("should return bad request if products past does not exists", async () => {
    await createProductUseCase.execute({
      name: "Moeda",
      description: "Moeda de 1945",
      owner_user_id: "49d957ac-d452-4cc0-bfd6-a4a2ab784424",
    });

    await expect(
      createAuctionUseCase.execute({
        name: "First Auction",
        description: "Auction to sell antiques",
        user_id: "49d957ac-d452-4cc0-bfd6-a4a2ab784424",
        products: ["49d957ac-d452-4cc0-bfd6-a4a2ab784424"],
      })
    ).rejects.toEqual(
      new AppError(
        "Even the user or some of the products are invalid to create this auction",
        400
      )
    );
  });

  it("should return bad request if products past is not from the same user", async () => {
    const product = await createProductUseCase.execute({
      name: "Moeda",
      description: "Moeda de 1945",
      owner_user_id: "49d957ac-d452-4cc0-bfd6-a4a2ab784424",
    });

    await expect(
      createAuctionUseCase.execute({
        name: "First Auction",
        description: "Auction to sell antiques",
        user_id: "49d957ac-d452-4cc0-bfd6-a4a2ab784423",
        products: [product.id],
      })
    ).rejects.toEqual(
      new AppError(
        "Even the user or some of the products are invalid to create this auction",
        400
      )
    );
  });

  it("should return bad request if products past is already in another auction", async () => {
    const product = await createProductUseCase.execute({
      name: "Moeda",
      description: "Moeda de 1945",
      owner_user_id: "49d957ac-d452-4cc0-bfd6-a4a2ab784424",
    });

    await createAuctionUseCase.execute({
      name: "First Auction",
      description: "Auction to sell antiques",
      user_id: "49d957ac-d452-4cc0-bfd6-a4a2ab784424",
      products: [product.id],
    });

    await expect(
      createAuctionUseCase.execute({
        name: "Second Auction",
        description: "Auction to sell antiques 2",
        user_id: "49d957ac-d452-4cc0-bfd6-a4a2ab784424",
        products: [product.id],
      })
    ).rejects.toEqual(
      new AppError("Some of the products are already in an auction", 400)
    );
  });
});
