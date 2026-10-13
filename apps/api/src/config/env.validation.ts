import Joi from 'joi';

const envSchema = Joi.object({
  NODE_PORT: Joi.number().port().default(8080),
  API_PREFIX: Joi.string().default('/api'),
});

export default envSchema;
