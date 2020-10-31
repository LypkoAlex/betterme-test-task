import { Controller, Get, Query  } from '@nestjs/common';

import { RepositoriesService }  from '../providers/repositories.service';
import { SearchInput } from '../models/repositories.search.interface';

@Controller()
export class GithubController {
    constructor(private repositoriesService: RepositoriesService) {};

    @Get('repositories')
    searchRepository(@Query() searchQuery: SearchInput){
        return this.repositoriesService.search(searchQuery);
    }
}
