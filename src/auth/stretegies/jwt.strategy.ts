import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'kjns8u47hn2iun3o2u3ndi2uh4943i0jop2idm2', //configService.get('JWT_SECRETE'),
    });
  }

  async validate(payload) {
    // delete payload?.user?.password;
    return { id: payload.sub, user: payload.user };
  }
}
