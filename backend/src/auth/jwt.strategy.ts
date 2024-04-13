import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private userService: UserService,
        configService: ConfigService,
    ) {
        super({
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: any) {
        const user = await this.userService.findById(payload.id);
        if (!user) {
            throw new UnauthorizedException('Error 401: UNAUTHORIZED');
        }
        return user;
    }
}
