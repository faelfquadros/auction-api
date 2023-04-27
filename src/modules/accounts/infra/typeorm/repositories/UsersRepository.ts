import { Repository, getRepository } from "typeorm";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
  constructor() {
    this.repository = getRepository(User);
  }

  private repository: Repository<User>;

  async create({
    email,
    name,
    password,
    type,
    id,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      email,
      name,
      password,
      type,
      id,
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ where: { email } });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);

    return user;
  }
}

export { UsersRepository };
