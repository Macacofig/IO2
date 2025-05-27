// users.module.ts
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';  // Importa TypeOrmModule
import { User } from './users.entity';  // Importa la entidad User
import { UploadUsersService } from './excel/upload-users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],  // Registra la entidad User en el módulo
  providers: [UsersService, UploadUsersService],
  controllers: [UsersController]
})
export class UsersModule {}