import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Aquí defines cómo extraer el token, por ejemplo desde el header "Authorization: Bearer <token>"
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Aquí va la clave secreta usada para firmar los tokens
      secretOrKey: 'f7Q9Ck38yZ!dxb$1S&vMfP@r0wXLYUa^5EGJmH2zgBqD6LcVsu4WNQhx%ITR',
    });
  }

  async validate(payload: any) {
    // El payload es el contenido del token ya verificado. 
    // Aquí puedes hacer lógica adicional: por ejemplo, buscar el usuario en la BD.
    return payload;
  }
}