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

  async getAllFiles(): Promise<FileEntity[]> {
  return await this.filesRepository.find();
  }

  async getFileById(id: number): Promise<FileEntity> 
  {
    const file = await this.filesRepository.findOneBy({ id });
    if (!file) {
      throw new Error(`File with id ${id} not found`);
    }
    return file;
  } 
}
