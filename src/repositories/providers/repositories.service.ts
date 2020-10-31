import { Injectable } from '@nestjs/common';
import { SearchInput } from '../models/repositories.search.interface';

@Injectable()
export class RepositoriesService {
    async search(query: SearchInput) {
        console.log(query);
        
        return {};
    }
}
