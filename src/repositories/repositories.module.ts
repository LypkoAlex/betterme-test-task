import { CacheModule, HttpModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { GithubController } from './controllers/repositories.controller';
import { RepositoriesService } from './services/repositories.service';
import { AuthModule } from '../common/auth/auth.module';

@Module({ 
    imports: [
        HttpModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                baseURL: configService.get<string>('github.url')
            }),
            inject: [ConfigService],
        }),
        CacheModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                ttl: configService.get<string>('cache.ttl'),
                max: configService.get<string>('cache.size'),
            }),
            inject: [ConfigService],
        }),
        ConfigModule,
        AuthModule,
    ],
    controllers: [GithubController],
    providers: [RepositoriesService],
})
export class RepositoriesModule {}
