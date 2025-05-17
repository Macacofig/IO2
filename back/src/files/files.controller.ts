import { BadRequestException, Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: memoryStorage(), // ✅ Guarda en memoria (NO en disco)
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB
    },
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(xlsx|pdf|pptx)$/)) {
        return cb(new BadRequestException('Tipo de archivo no permitido'), false);
      }
      cb(null, true);
    }
  }))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('materia') materia: string,
    @Body('tema') tema: string,
  ) {
    if (!file) {
      throw new BadRequestException('No se ha subido ningún archivo');
    }

    // Puedes validar los campos si es necesario
    if (!materia || !tema) {
      throw new BadRequestException('Faltan datos requeridos: materia o tema');
    }

    // Aquí podrías enviar todo a tu servicio
    return this.filesService.saveFileToDatabase(file, materia, tema);
  }
}