import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { GithubController } from './controllers/repositories.controller';
import { RepositoriesService } from './providers/repositories.service';
import { AuthModule } from '../common/auth/auth.module';

@Module({ 
    imports: [
        HttpModule,
        ConfigModule.forRoot({
            envFilePath: ['.env.development.local'],
        }),
        AuthModule
    ],
    controllers: [GithubController],
    providers: [RepositoriesService],
})
export class RepositoriesModule {}
