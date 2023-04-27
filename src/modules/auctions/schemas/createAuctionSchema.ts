/* eslint-disable import/no-extraneous-dependencies */
import Joi from "joi";

const createAuctionSchema = Joi.object().keys({
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    products: Joi.array().items(Joi.string().uuid()).required(),
  }),
});

export { createAuctionSchema };
