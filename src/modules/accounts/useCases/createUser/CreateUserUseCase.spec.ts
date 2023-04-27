import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { InMemoryUsersRepository } from "@modules/accounts/repositories/in-memory/InMemoryUsersRepository";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "./CreateUserUseCase";

let inMemoryUsersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate a User", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it("should be able to create an user", async () => {
    const user: ICreateUserDTO = {
      type: "seller",
      email: "teste@teste.coom",
      name: "Teste",
      password: "123456",
    };

    const newUser = await createUserUseCase.execute(user);

    expect(newUser).toBe("User has been created");
  });

  it("should return 409 if user already exists", async () => {
    const user: ICreateUserDTO = {
      type: "seller",
      email: "teste@teste.coom",
      name: "Teste",
      password: "123456",
    };

    await createUserUseCase.execute(user);

    await expect(createUserUseCase.execute(user)).rejects.toEqual(
      new AppError("User already exists", 409)
    );
  });

  it("should return bad request if user type is different than seller or buyer", async () => {
    const user: ICreateUserDTO = {
      type: "salesman",
      email: "teste@teste.coom",
      name: "Teste",
      password: "123456",
    };

    await expect(createUserUseCase.execute(user)).rejects.toEqual(
      new AppError("User type is not supported", 400)
    );
  });
});
