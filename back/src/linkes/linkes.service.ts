import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LinkesEntity } from './linkes.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LinkesService {

  constructor(@InjectRepository(LinkesEntity) private readonly linkesRepository: Repository<LinkesEntity>) {}

  /* Registar un nuevo link */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  async createLink(link: string, materia: string, tema: string): Promise<any> 
  {
    const newLink = this.linkesRepository.create({link, materia, tema});
    return await this.linkesRepository.save(newLink);
  }
  
}
