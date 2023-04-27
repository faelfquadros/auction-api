/* eslint-disable import/no-extraneous-dependencies */
import Joi from "joi";

const createUserSchema = Joi.object().keys({
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    type: Joi.string().required(),
  }),
});

export { createUserSchema };
