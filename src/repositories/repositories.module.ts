import { CacheModule, HttpModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { GithubController } from './controllers/repositories.controller';
import { RepositoriesService } from './providers/repositories.service';
import { AuthModule } from '../common/auth/auth.module';

@Module({ 
    imports: [
        HttpModule,
        ConfigModule.forRoot({
            envFilePath: ['.env.development.local'],
        }),
        AuthModule,
        CacheModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                ttl: configService.get<string>('CACHE_TTL'),
                max: configService.get<string>('CACHE_SIZE'),
            }),
            inject: [ConfigService],
        })
    ],
    controllers: [GithubController],
    providers: [RepositoriesService],
})
export class RepositoriesModule {}
