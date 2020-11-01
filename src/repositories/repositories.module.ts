import { CacheModule, HttpModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

import { RepositoriesController } from './controllers/repositories.controller';
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
                store: redisStore,
                host: configService.get<string>('redis.host'),
                port: configService.get<string>('redis.port'),
            }),
            inject: [ConfigService],
        }),
        ConfigModule,
        AuthModule,
    ],
    controllers: [RepositoriesController],
    providers: [RepositoriesService],
})
export class RepositoriesModule {}
