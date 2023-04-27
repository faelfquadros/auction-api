import { AppError } from "@shared/errors/AppError";

import { IResponse } from "../../../../@types/src/modules/products/useCases/createProduct";
import { InMemoryProductsRepository } from "../../repositories/in-memory/InMemoryProductsRepository";
import { CreateProductUseCase } from "./CreateProductUseCase";

let createProductUseCase: CreateProductUseCase;
let inMemoryProductsRepository: InMemoryProductsRepository;

const expected: IResponse = {
  id: expect.any(String),
  name: expect.any(String),
  description: expect.any(String),
  owner_user_id: expect.any(String),
};

describe("Create product", () => {
  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository();
    createProductUseCase = new CreateProductUseCase(inMemoryProductsRepository);
  });

  it("shoud be able to create a new product", async () => {
    const product = await createProductUseCase.execute({
      name: "Moeda",
      description: "Moeda de 1945",
      owner_user_id: "49d957ac-d452-4cc0-bfd6-a4a2ab784424",
    });

    expect(product).toMatchObject(expected);
  });

  it("shoud not be able to create the product with the same name twice", async () => {
    await createProductUseCase.execute({
      name: "Moeda",
      description: "Moeda de 1945",
      owner_user_id: "49d957ac-d452-4cc0-bfd6-a4a2ab784424",
    });

    await expect(
      createProductUseCase.execute({
        name: "Moeda",
        description: "Moeda de 1945",
        owner_user_id: "49d957ac-d452-4cc0-bfd6-a4a2ab784424",
      })
    ).rejects.toEqual(new AppError("This product already exists", 409));
  });
});
