import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { InMemoryUsersRepository } from "@modules/accounts/repositories/in-memory/InMemoryUsersRepository";
import { InMemoryUsersTokensRepository } from "@modules/accounts/repositories/in-memory/InMemoryUsersTokensRepository";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { AuthenticateUserUseCase } from "../authenticateUser/AuthenticateUserUseCase";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryUsersTokensRepository: InMemoryUsersTokensRepository;
let dateProvider: DayjsDateProvider;
let authenticateUserUseCase: AuthenticateUserUseCase;
let refreshTokenUseCase: RefreshTokenUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Refresh a user token", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryUsersTokensRepository = new InMemoryUsersTokensRepository();
    dateProvider = new DayjsDateProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUsersRepository,
      inMemoryUsersTokensRepository,
      dateProvider
    );
    refreshTokenUseCase = new RefreshTokenUseCase(
      inMemoryUsersTokensRepository,
      dateProvider
    );
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it("should be able to refresh a user token", async () => {
    const user: ICreateUserDTO = {
      type: "seller",
      email: "teste@teste.coom",
      name: "Teste",
      password: "123456",
    };

    await createUserUseCase.execute(user);

    const authentication = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    const refreshToken = await refreshTokenUseCase.execute(
      authentication.refresh_token
    );

    expect(refreshToken).toHaveProperty("refresh_token");
    expect(refreshToken).toHaveProperty("token");
  });

  it("should return bad request if refresh token does not exists into the database", async () => {
    const user: ICreateUserDTO = {
      type: "seller",
      email: "teste@teste.coom",
      name: "Teste",
      password: "123456",
    };

    await createUserUseCase.execute(user);

    const authentication = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    const refreshToken = await inMemoryUsersTokensRepository.findByRefreshToken(
      authentication.refresh_token
    );

    await inMemoryUsersTokensRepository.deleteById(refreshToken.id);

    await expect(
      refreshTokenUseCase.execute(authentication.refresh_token)
    ).rejects.toEqual(new AppError("Refresh token does not exists!", 404));
  });
});
