import * as Joi from 'joi';

export const configVars = {
  PORT: 'PORT',
  GLOBAL_PREFIX: 'GLOBAL_PREFIX',
};

export const validationSchema = Joi.object({
  PORT: Joi.number().required(),
  GLOBAL_PREFIX: Joi.string().required(),
});
