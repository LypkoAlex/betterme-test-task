import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as queryString from 'querystring';
import { map } from 'rxjs/operators';
import { SearchInput } from '../models/repositories.search.interface';

@Injectable()
export class RepositoriesService {
    constructor(
        private httpService: HttpService,
        private configService: ConfigService,
    ) {}

    async search(searchInput: SearchInput) {
        const baseUrl = this.configService.get<string>('GITHUB_BASE_API_URL');

        const query = queryString.stringify({
            q        : `${searchInput.name}+in:name`,
            sort     : searchInput.sort,
            order    : searchInput.order,
            page     : searchInput.page,
            per_page : searchInput.per_page
        });

        const url = `${baseUrl}/search/repositories\?${query}`;
        const result = this.httpService.get(url).pipe(map(response => response.data));

        return result;
    }
}
