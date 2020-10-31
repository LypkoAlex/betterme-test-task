import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationSchema } from './common/config/config.schema';
import configuration from './common/config/configuration';
import { RepositoriesModule } from './repositories/repositories.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
            validationSchema: ConfigurationSchema
        }),
        RepositoriesModule
    ],
})
export class AppModule {}
