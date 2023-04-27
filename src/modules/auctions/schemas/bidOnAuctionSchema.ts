/* eslint-disable import/no-extraneous-dependencies */
import Joi from "joi";

const bidOnAuctionSchema = Joi.object().keys({
  body: Joi.object().keys({
    auction_id: Joi.string().uuid().required(),
    product_id: Joi.string().uuid().required(),
    value: Joi.number().required(),
  }),
});

export { bidOnAuctionSchema };
