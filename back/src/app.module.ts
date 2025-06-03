import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';
import { FilesModule } from './files/files.module';
import { FileEntity } from './files/files.entity';
import { LinkesModule } from './linkes/linkes.module';
import { LinkesEntity } from './linkes/linkes.entity';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [User, FileEntity, LinkesEntity], // Asegúrate de agregar las entidades correspondientes aquí
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    FilesModule,
    LinkesModule,
   
    // Otros módulos aquí
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
