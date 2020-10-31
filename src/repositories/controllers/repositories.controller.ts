import { Controller, Get, Query, UsePipes  } from '@nestjs/common';

import { JoiValidationPipe } from '../../common/validation/validation.pipe';
import { RepositoriesService }  from '../providers/repositories.service';
import { SearchInput } from '../models/repositories.search.interface';
import { SearchSchema } from '../models/repositories.search.schema';
import { JwtAuthenticationGuard } from 'src/common/auth/auth.guard';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';

@Controller()
@UseGuards(JwtAuthenticationGuard)
export class GithubController {
    constructor(private repositoriesService: RepositoriesService) {};

    @Get('repositories')
    @UsePipes(new JoiValidationPipe(SearchSchema))
    searchRepository(@Query() searchInput: SearchInput){
        return this.repositoriesService.search(searchInput);
    }
}
