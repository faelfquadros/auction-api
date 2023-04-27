/* eslint-disable import/no-extraneous-dependencies */
import Joi from "joi";

const refreshTokenSchema = Joi.object().keys({
  body: Joi.object().keys({
    token: Joi.string().required(),
  }),
});

export { refreshTokenSchema };
