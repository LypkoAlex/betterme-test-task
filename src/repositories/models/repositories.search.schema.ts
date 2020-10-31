import * as Joi from '@hapi/joi';
import { SearchInput } from './repositories.search.interface';

export const SearchSchema = Joi.object<SearchInput>({
    name: Joi.string()
        .required(),

    page: Joi.number()
        .optional()
        .default(1),

    sort: Joi.string()
        .valid('forks', 'stars', 'updated', 'help-wanted-issues')
        .default('stars'),

    order: Joi.string()
        .valid('desc', 'asc')
        .default('desc'),

    per_page: Joi.number()
        .optional()
        .default(30),
});