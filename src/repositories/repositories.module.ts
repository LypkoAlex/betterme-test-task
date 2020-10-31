import { Module } from '@nestjs/common';
import { GithubController } from './controllers/repositories.controller';
import { RepositoriesService } from './providers/repositories.service';

@Module({ 
    imports: [],
    controllers: [GithubController],
    providers: [RepositoriesService],
})
export class RepositoriesModule {}
