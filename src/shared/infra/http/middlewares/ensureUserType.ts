import { Request, Response, NextFunction } from "express";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

export function ensureUserType(type: string) {
  return async (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { id } = req.user;

    const userRepository = new UsersRepository();

    const user = await userRepository.findById(id);

    if (user.type !== type) {
      throw new AppError(`User is not a ${type}`);
    }

    return next();
  };
}
