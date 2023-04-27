import { AppError } from "@shared/errors/AppError";

import { IResponse } from "../../../../@types/src/modules/auctions/useCases/bidOnAuctionProduct";
import { InMemoryProductsRepository } from "../../../products/repositories/in-memory/InMemoryProductsRepository";
import { CreateProductUseCase } from "../../../products/useCases/createProduct/CreateProductUseCase";
import { InMemoryAuctionsProductsBidsRepository } from "../../repositories/in-memory/InMemoryAuctionsProductsBidsRepository";
import { InMemoryAuctionsProductsRepository } from "../../repositories/in-memory/InMemoryAuctionsProductsRepository";
import { InMemoryAuctionsRepository } from "../../repositories/in-memory/InMemoryAuctionsRepository";
import { CreateAuctionUseCase } from "../createAuction/CreateAuctionUseCase";
import { BidOnAuctionProductUseCase } from "./BidOnAuctionProductUseCase";

let bidOnAuctionProductUseCase: BidOnAuctionProductUseCase;
let createAuctionUseCase: CreateAuctionUseCase;
let createProductUseCase: CreateProductUseCase;
let inMemoryAuctionsRepository: InMemoryAuctionsRepository;
let inMemoryAuctionsProductsRepository: InMemoryAuctionsProductsRepository;
let inMemoryAuctionsProductsBidsRepository: InMemoryAuctionsProductsBidsRepository;
let inMemoryProductsRepository: InMemoryProductsRepository;

const expected: IResponse = {
  user_id: expect.any(String),
  value: expect.any(Number),
};

describe("Create auction", () => {
  beforeEach(() => {
    inMemoryAuctionsRepository = new InMemoryAuctionsRepository();
    inMemoryAuctionsProductsRepository =
      new InMemoryAuctionsProductsRepository();
    inMemoryAuctionsProductsBidsRepository =
      new InMemoryAuctionsProductsBidsRepository();
    inMemoryProductsRepository = new InMemoryProductsRepository();
    createAuctionUseCase = new CreateAuctionUseCase(
      inMemoryAuctionsRepository,
      inMemoryProductsRepository
    );
    createProductUseCase = new CreateProductUseCase(inMemoryProductsRepository);
    bidOnAuctionProductUseCase = new BidOnAuctionProductUseCase(
      inMemoryAuctionsRepository,
      inMemoryAuctionsProductsRepository,
      inMemoryAuctionsProductsBidsRepository
    );
  });

  it("should be bid on an auction product", async () => {
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

    await inMemoryAuctionsProductsRepository.create(auction.id, [product.id]);

    const auctionProductBid = await bidOnAuctionProductUseCase.execute({
      auction_id: auction.id,
      product_id: product.id,
      user_id: "49d957ac-d452-4cc0-bfd6-a4a2ab784424",
      value: 10,
    });

    expect(auctionProductBid).toMatchObject(expected);
  });

  it("should return bad request if auction_id is invalid", async () => {
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

    await inMemoryAuctionsProductsRepository.create(auction.id, [product.id]);

    await expect(
      bidOnAuctionProductUseCase.execute({
        auction_id: "49d957ac-d452-4cc0-bfd6-a4a2ab784424",
        product_id: product.id,
        user_id: "49d957ac-d452-4cc0-bfd6-a4a2ab784424",
        value: 10,
      })
    ).rejects.toEqual(new AppError("Auction or product are invalid", 400));
  });

  it("should return bad request if product_id is invalid", async () => {
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

    await inMemoryAuctionsProductsRepository.create(auction.id, [product.id]);

    await expect(
      bidOnAuctionProductUseCase.execute({
        auction_id: auction.id,
        product_id: "49d957ac-d452-4cc0-bfd6-a4a2ab784424",
        user_id: "49d957ac-d452-4cc0-bfd6-a4a2ab784424",
        value: 10,
      })
    ).rejects.toEqual(new AppError("Auction or product are invalid", 400));
  });

  it("should return bad request if auctions is already finished", async () => {
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

    await inMemoryAuctionsProductsRepository.create(auction.id, [product.id]);
    await inMemoryAuctionsRepository.updateFinalize(auction.id);

    await expect(
      bidOnAuctionProductUseCase.execute({
        auction_id: auction.id,
        product_id: product.id,
        user_id: "49d957ac-d452-4cc0-bfd6-a4a2ab784424",
        value: 10,
      })
    ).rejects.toEqual(new AppError("This auction has already finished", 410));
  });

  it("should return bad request if auction is less or equal the last bid", async () => {
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

    await inMemoryAuctionsProductsRepository.create(auction.id, [product.id]);

    await bidOnAuctionProductUseCase.execute({
      auction_id: auction.id,
      product_id: product.id,
      user_id: "49d957ac-d452-4cc0-bfd6-a4a2ab784424",
      value: 10,
    });

    await expect(
      bidOnAuctionProductUseCase.execute({
        auction_id: auction.id,
        product_id: product.id,
        user_id: "49d957ac-d452-4cc0-bfd6-a4a2ab784424",
        value: 10,
      })
    ).rejects.toEqual(
      new AppError(
        "The bid needs to be above the last highest bid, which is 10",
        400
      )
    );
  });
});
