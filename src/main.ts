import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());

    const appConfig: ConfigService = app.get('ConfigService');

    await app.listen(appConfig.get('app.port'));
}
bootstrap();
