import { CacheInterceptor, Controller, Get, Query, UseInterceptors, UsePipes  } from '@nestjs/common';

import { JoiValidationPipe } from '../../common/validation/validation.pipe';
import { RepositoriesService }  from '../services/repositories.service';
import { SearchInput } from '../models/repositories.search.interface';
import { SearchSchema } from '../models/repositories.search.schema';
import { JwtAuthenticationGuard } from '../../common/auth/auth.guard';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';

@Controller()
@UseGuards(JwtAuthenticationGuard)
@UseInterceptors(CacheInterceptor)
export class RepositoriesController {
    constructor(private repositoriesService: RepositoriesService) {};

    @Get('repositories')
    @UsePipes(new JoiValidationPipe(SearchSchema))
    async searchRepository(@Query() searchInput: SearchInput){
        const result = await this.repositoriesService.search(searchInput);

        return result;
    }
}
