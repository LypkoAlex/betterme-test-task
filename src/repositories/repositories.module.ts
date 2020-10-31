import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { GithubController } from './controllers/repositories.controller';
import { RepositoriesService } from './providers/repositories.service';

@Module({ 
    imports: [
        HttpModule,
        ConfigModule.forRoot({
            envFilePath: ['.env.development.local'],
        }),
    ],
    controllers: [GithubController],
    providers: [RepositoriesService],
})
export class RepositoriesModule {}
