import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './files.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilesService {
    
constructor(
  @InjectRepository(FileEntity)
    private readonly filesRepository: Repository<FileEntity>,
) {}

  async saveFileToDatabase(file: Express.Multer.File, materia: string, tema: string): Promise<FileEntity> 
  {
    
    const newFile = this.filesRepository.create({
        filename: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        content: file.buffer,
        materia,
        tema,
    });

    return await this.filesRepository.save(newFile);
  }
}
