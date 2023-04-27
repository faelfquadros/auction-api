import { Request, Response, NextFunction } from "express";

import { AppError } from "@shared/errors/AppError";

export function validation(schema: any) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error } = schema.validate(req, {
      stripUnknown: true,
      allowUnknown: true,
    });

    if (!error) {
      return next();
    }

    const { details } = error;
    const message = details.map((i) => i.message).join(",");

    throw new AppError(message, 400);
  };
}
