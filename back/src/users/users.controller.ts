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
  UseGuards,
  Param
} from '@nestjs/common';
import { UploadUsersService } from './excel/upload-users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs/promises';
import * as path from 'path';
import { UsersService } from './users.service';
import { TimeoutError } from 'rxjs';
import * as os from 'os';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(
    private readonly uploadUsersService: UploadUsersService,
    private readonly usuarioservice: UsersService
  ) {}
  @UseGuards(AuthGuard('jwt'))
  @Post('algo')
  async algo(@Body() body: any) {
    console.log("llegue")
    return {res:"he vuelto del back"};
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('validate-token')
  async validateToken() : Promise<{true: boolean}> {
    // Si entra aquí, el token es válido
    return {true: true}; ;
  }

  @Get()
  async getUsers() {
    try {
      return await {hola: 'mundo'};
    } catch (error) {
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException('La conexión con la base de datos está tardando demasiado. Intenta más tarde.');
      }
      throw new InternalServerErrorException('Hubo un problema al obtener los usuarios. Intenta más tarde.');
    }
  }
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
    console.log('Archivo recibido:', file?.originalname);
    console.log('Materia:', materia);
    console.log('Paralelo:', paralelo);
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
    } catch (err) {
    console.error('❌ Error al procesar el Excel:', err);
    throw new InternalServerErrorException();
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
      console.log("kratos2")
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
  
  // Recuperar Paralelos
  
  @Post('paralelos-materia')
  async getParalelosByMateria(@Body('materia') materia: string) 
  {
    console.log(materia)
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
  async deleteUsers(@Body() body: { materia: string, paralelo: string }) {
  const { materia, paralelo } = body;
  console.log(body)
  try 
    {
      await this.usuarioservice.deleteusersParaleloMateria(materia, paralelo);
      return { message: 'Usuarios eliminados correctamente' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Hubo un problema al eliminar los usuarios. Intenta más tarde.');
    }
  }


  @Get('emails')
  async getAllEmails() {
    try {
      return await this.usuarioservice.getAllEmails();
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener los correos');
    }
  }

  @Delete('delete-user-paralelo')
  async deleteByEmailAndParalelo(@Body() body: { email: string; paralelo: string }) {
    const { email, paralelo } = body;
    try {
      await this.usuarioservice.deleteByEmailAndParalelo(email, paralelo);
      return { message: 'Usuario eliminado correctamente' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al eliminar el usuario');
    }
  }

  @Post('emails-by-materia-paralelo')
  async getEmailsByMateriaParalelo(@Body() body: { materia: string; paralelo: string }) {
    const { materia, paralelo } = body;
    try {
      return await this.usuarioservice.getEmailsByMateriaParalelo(materia, paralelo);
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener correos');
    }
  }
}