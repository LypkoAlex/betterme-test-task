import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(req) => {
                return req?.cookies?.AUTH_TOKEN;
            }]),

            ignoreExpiration: false,
            secretOrKey: configService.get<string>('jwt.secret'),
        });
    }

    async validate() {
        return { valid: true};
    }
}