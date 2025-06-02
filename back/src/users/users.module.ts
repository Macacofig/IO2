// users.module.ts
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';  // Importa TypeOrmModule
import { User } from './users.entity';  // Importa la entidad User
import { UploadUsersService } from './excel/upload-users.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/jwtStrategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'f7Q9Ck38yZ!dxb$1S&vMfP@r0wXLYUa^5EGJmH2zgBqD6LcVsu4WNQhx%ITR',
      signOptions: { expiresIn: '30d' }, //  30 días
    }),
    TypeOrmModule.forFeature([User])
  ],  // Registra la entidad User en el módulo
  providers: [UsersService, UploadUsersService, JwtStrategy],
  controllers: [UsersController]
})
export class UsersModule {}