import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    email,
    name,
    password,
    type,
  }: ICreateUserDTO): Promise<string> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User already exists", 409);
    }

    if (!["buyer", "seller"].includes(type)) {
      throw new AppError("User type is not supported", 400);
    }

    const hashedPassword = await hash(password, 8);

    await this.usersRepository.create({
      email,
      name,
      password: hashedPassword,
      type,
    });

    return "User has been created";
  }
}

export { CreateUserUseCase };
