import { HttpService, Injectable } from '@nestjs/common';
import * as queryString from 'querystring';
import { map } from 'rxjs/operators';
import { SearchInput } from '../models/repositories.search.interface';

@Injectable()
export class RepositoriesService {
    constructor(
        private httpService: HttpService,
    ) {}

    async search(searchInput: SearchInput) {
        const query = queryString.stringify({
            q        : `${searchInput.name} in:name`,
            sort     : searchInput.sort,
            order    : searchInput.order,
            page     : searchInput.page,
            per_page : searchInput.per_page
        });


        const result = this.httpService.get(`/search/repositories\?${query}`)
            .pipe(map(response => response.data));

        return result;
    }
}
