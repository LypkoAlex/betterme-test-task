import * as Joi from '@hapi/joi';

export const ConfigurationSchema = Joi.object({
    APP_PORT: Joi.number().required(),
    JWT_SECRET: Joi.string().required(),
    CACHE_TTL: Joi.string().required(),
    CACHE_SIZE: Joi.number().required(),
    REDIS_HOST: Joi.string().optional(),
    REDIS_PORT: Joi.number().optional(),
    GITHUB_BASE_API_URL: Joi.string().required()
});