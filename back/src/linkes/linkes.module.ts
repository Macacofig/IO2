import { Module } from '@nestjs/common';
import { LinkesService } from './linkes.service';
import { LinkesController } from './linkes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkesEntity } from './linkes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LinkesEntity])],
  providers: [LinkesService],
  controllers: [LinkesController]
})
export class LinkesModule {}
