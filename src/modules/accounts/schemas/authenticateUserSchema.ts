/* eslint-disable import/no-extraneous-dependencies */
import Joi from "joi";

const authenticateUserSchema = Joi.object().keys({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

export { authenticateUserSchema };
