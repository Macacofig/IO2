import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Body,
  RequestTimeoutException,
  InternalServerErrorException,
  NotFoundException,
  Get,
  Delete,
} from '@nestjs/common';
import { UploadUsersService } from './excel/upload-users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs/promises';
import * as path from 'path';
import { UsersService } from './users.service';
import { TimeoutError } from 'rxjs';
import * as os from 'os';

@Controller('users')
export class UsersController {
  constructor(
    private readonly uploadUsersService: UploadUsersService,
    private readonly usuarioservice: UsersService
  ) {}
  

  /*Guardar Los estudiantes desde Excels*/
  /**********************************************************************************************************/
  /**********************************************************************************************************/
  @Post('upload-excel')
  @UseInterceptors(FileInterceptor('file', {
  storage: diskStorage({
    destination: os.tmpdir(),
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${file.originalname}`;
      cb(null, uniqueName);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (!file.originalname.endsWith('.xlsx')) {
      return cb(new BadRequestException('Solo se permiten archivos .xlsx'), false);
    }
    cb(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
  }))
  async uploadExcel(
    @UploadedFile() file: Express.Multer.File,
    @Body('materia') materia: string,
    @Body('paralelo') paralelo: string,
  ) 
  {
    if (!file) {
      throw new BadRequestException('No se ha subido ningún archivo');
    }

    const filePath = path.resolve(file.path);

    try {
      const result = await this.uploadUsersService.processExcelFile(filePath, materia, paralelo);
      return {
        message: 'Archivo procesado',
        details: result,
      };
    } finally {
      await fs.unlink(filePath);
    }
  }

  /* Login selectivo*/
  /**********************************************************************************************************/
  /**********************************************************************************************************/
  @Post('login')
  async login(@Body() body: { email: string, materia: string, password: string }) 
  {
    try
    {
      const { email, materia, password } = body;
      return await this.usuarioservice.loginSelect(email, materia, password);
    } catch (error) 
    {
      if (error instanceof TimeoutError) 
      {  // Verifica si el error es por tiempo de espera
        throw new RequestTimeoutException('La conexión con la base de datos está tardando demasiado. Intenta más tarde.');
      }
      
      if(error instanceof NotFoundException)
      {
        throw error;
      }
      // Si es otro tipo de error, lanzamos un error interno
      throw new InternalServerErrorException('Hubo un problema. Intenta más tarde.');
    }
  }

  /* Obtener paralelos por materia */
  /**********************************************************************************************************/
  /**********************************************************************************************************/
  
  @Get('paralelos-materia')
  async getParalelosByMateria(@Body('materia') materia: string) 
  {
    try 
    {
      return await this.usuarioservice.getParalelosByMateria(materia);
    } 
    catch (error) 
    {
      if (error instanceof NotFoundException) 
      {
        throw error;
      }
      throw new InternalServerErrorException('Hubo un problema al obtener los paralelos. Intenta más tarde.');
    }
  }
 
  /* Eliminar los usuarios de una materia y paralelo */
  /**********************************************************************************************************/
  /**********************************************************************************************************/
  @Delete('delete-users')
  async deleteUsers(@Body() body: {materia: string, paralelo: string}) 
  {
    try 
    {
      const { materia, paralelo } = body;
      await this.usuarioservice.deleteusersParaleloMateria(materia, paralelo);
      return { message: 'Usuarios eliminados correctamente' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Hubo un problema al eliminar los usuarios. Intenta más tarde.');
    }
  }
}