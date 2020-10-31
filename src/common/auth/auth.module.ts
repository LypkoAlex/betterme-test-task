import { Module }         from '@nestjs/common';
import { ConfigModule }   from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy }    from './auth.strategy';

@Module({ 
    imports: [
        PassportModule,
        ConfigModule.forRoot({
            envFilePath: ['.env.development.local'],
        }),
    ],
    providers: [JwtStrategy],
})
export class AuthModule {}
