import { IResponse } from "../../../../@types/src/modules/products/useCases/listProducts";
import { InMemoryProductsRepository } from "../../repositories/in-memory/InMemoryProductsRepository";
import { CreateProductUseCase } from "../createProduct/CreateProductUseCase";
import { ListAvailableProductsToSaleUseCase } from "./ListAvailableProductsToSaleUseCase";

let createProductUseCase: CreateProductUseCase;
let listAvailableProductsToSaleUseCase: ListAvailableProductsToSaleUseCase;
let inMemoryProductsRepository: InMemoryProductsRepository;

const expected: IResponse[] = [
  {
    id: expect.any(String),
    name: expect.any(String),
    description: expect.any(String),
    owner_user_id: expect.any(String),
  },
];

describe("List available products to sale", () => {
  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository();
    createProductUseCase = new CreateProductUseCase(inMemoryProductsRepository);
    listAvailableProductsToSaleUseCase = new ListAvailableProductsToSaleUseCase(
      inMemoryProductsRepository
    );
  });

  it("shoud be able to list the products available to sale", async () => {
    const product = await createProductUseCase.execute({
      name: "Moeda",
      description: "Moeda de 1945",
      owner_user_id: "49d957ac-d452-4cc0-bfd6-a4a2ab784424",
    });

    const productsList = await listAvailableProductsToSaleUseCase.execute({
      owner_user_id: product.owner_user_id,
    });

    expect(productsList).toMatchObject(expected);
  });

  it("shoud return nothing if filter does not exists", async () => {
    const product = await createProductUseCase.execute({
      name: "Moeda",
      description: "Moeda de 1945",
      owner_user_id: "49d957ac-d452-4cc0-bfd6-a4a2ab784424",
    });

    const productsList = await listAvailableProductsToSaleUseCase.execute({
      name: "Mus",
      owner_user_id: product.owner_user_id,
    });

    expect(productsList.length).toBe(0);
  });
});
