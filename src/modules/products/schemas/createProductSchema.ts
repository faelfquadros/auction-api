/* eslint-disable import/no-extraneous-dependencies */
import Joi from "joi";

const createProductSchema = Joi.object().keys({
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
  }),
});

export { createProductSchema };
