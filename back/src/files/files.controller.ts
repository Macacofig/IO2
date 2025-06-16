import { BadRequestException, Body, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Param, Post, RequestTimeoutException, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { Response } from 'express';
import { TimeoutError } from 'rxjs';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  /*********************************************************************************************************/
  /*********************************************************************************************************/
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: memoryStorage(), // ✅ Guarda en memoria (NO en disco)
    limits: {
      fileSize: 20 * 1024 * 1024, // 20MB
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

  /*Descargar un archivo por ID */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  @Get(':id/download')
  async downloadFile(@Param('id') id: number, @Res() res: Response) {
    const file = await this.filesService.getFileById(id);
    if (!file) {
      throw new NotFoundException('Archivo no encontrado');
    }

    res.set({
      'Content-Type': file.mimetype,
      'Content-Disposition': `attachment; filename="${file.filename}"`,
    });

    res.send(file.content);
  }

  /* ELIMINAR ARCHIVOS */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  @Delete('delete/:nombreArchivo')
  async deleteFile(@Param('nombreArchivo') nombreArchivo: string) 
  {
    console.log('nombreArchivo', nombreArchivo);
    try 
    {
      const archivo = await this.filesService.findByName(nombreArchivo);

      if (!archivo) {
        throw new NotFoundException('Archivo no encontrado');
      }

      await this.filesService.deleteFileById(archivo.id);

      return { message: 'Archivo eliminado correctamente' };
    } catch (error) {
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException('La conexión con la base de datos está tardando demasiado. Intenta más tarde.');
      }
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Hubo un problema. Intenta más tarde.');
    }
  }
  /* Obtener archivos de Markov IO2 */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  @Get('Markov')
  async getFilesMarkov() 
  {
    try 
    {
      const files = await this.filesService.getFilesMarkovIO2();

      // Retorna solo los campos requeridos
      return files.map(file => ({
        id: file.id,
        nombre: file.filename,       // Puedes renombrar 'filename' como 'nombre' si lo deseas
        materia: file.materia,
        tema: file.tema,
        downloadUrl: `https://educationio.onrender.com/files/${file.id}/download`,
      }));
    
    } catch (error) {
      if (error instanceof TimeoutError) 
      {
        throw new RequestTimeoutException('La conexión con la base de datos está tardando demasiado. Intenta más tarde.');
      }
      if (error instanceof NotFoundException) 
      {
        throw error;
      }
      throw new InternalServerErrorException('Hubo un problema. Intenta más tarde.');
    }
  }
  
  /* Obtener archivos de Colas IO2 */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  @Get('Colas')
  async getFilesColas() 
  {
    try 
    {
      const files = await this.filesService.getFilesColasIO2();

      // Retorna solo los campos requeridos
      return files.map(file => ({
        id: file.id,
        nombre: file.filename,       // Puedes renombrar 'filename' como 'nombre' si lo deseas
        materia: file.materia,
        tema: file.tema,
        downloadUrl: `https://educationio.onrender.com/files/${file.id}/download`,
      }));
      
    } catch (error) {
      if (error instanceof TimeoutError) 
      {
        throw new RequestTimeoutException('La conexión con la base de datos está tardando demasiado. Intenta más tarde.');
      }
      if (error instanceof NotFoundException) 
      {
        throw error;
      }
      throw new InternalServerErrorException('Hubo un problema. Intenta más tarde.');
    }
  }

  /* Obtener archivos de Simulacion IO2 */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  @Get('Simulacion')
  async getFilesSimulacion() 
  {
    try 
    {
      const files = await this.filesService.getFilesSimulacionIO2();
        
      // Retorna solo los campos requeridos
      return files.map(file => ({
        id: file.id,
        nombre: file.filename,       // Puedes renombrar 'filename' como 'nombre' si lo deseas
        materia: file.materia,
        tema: file.tema,
        downloadUrl: `https://educationio.onrender.com/files/${file.id}/download`,
      }));
      
    } catch (error) {
      if (error instanceof TimeoutError) 
      {
        throw new RequestTimeoutException('La conexión con la base de datos está tardando demasiado. Intenta más tarde.');
      }
      if (error instanceof NotFoundException) 
      {
        throw error;
      }
      throw new InternalServerErrorException('Hubo un problema. Intenta más tarde.');
    }
  }

  /* Obtener archivos de Decisiones IO2 */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  @Get('Decisiones')
  async getFilesDecisiones() 
  {
    try 
    {
      const files = await this.filesService.getFilesDecisionesIO2();

      // Retorna solo los campos requeridos
      return files.map(file => ({
        id: file.id,
        nombre: file.filename,       // Puedes renombrar 'filename' como 'nombre' si lo deseas
        materia: file.materia,
        tema: file.tema,
        downloadUrl: `https://educationio.onrender.com/files/${file.id}/download`,
      }));
      
    } catch (error) {
      if (error instanceof TimeoutError) 
      {
        throw new RequestTimeoutException('La conexión con la base de datos está tardando demasiado. Intenta más tarde.');
      }
      if (error instanceof NotFoundException) 
      {
        throw error;
      }
      throw new InternalServerErrorException('Hubo un problema. Intenta más tarde.');
    }
  }

  /* Obtener archivos de Inventarios IO2 */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  @Get('Inventarios')
async getFilesInventarios() 
{
  try 
  {
    const files = await this.filesService.getFilesInventariosIO2();

    // Retorna solo los campos requeridos
    return files.map(file => ({
      id: file.id,
      nombre: file.filename,       // Puedes renombrar 'filename' como 'nombre' si lo deseas
      materia: file.materia,
      tema: file.tema,
      downloadUrl: `https://educationio.onrender.com/files/${file.id}/download`,
    }));
    
  } catch (error) {
    if (error instanceof TimeoutError) 
    {
      throw new RequestTimeoutException('La conexión con la base de datos está tardando demasiado. Intenta más tarde.');
    }
    if (error instanceof NotFoundException) 
    {
      throw error;
    }
    throw new InternalServerErrorException('Hubo un problema. Intenta más tarde.');
  }
}
  
  /* Obtener archivos de Programación Lineal y Dual IO1 */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  @Get('ProgramacionLineal')
  async getFilesProgramacionLineal()
  {
    try 
    {
      const files = await this.filesService.getFilesProgramacionLinealIO1();

      // Retorna solo los campos requeridos
      return files.map(file => ({
        id: file.id,
        nombre: file.filename,       // Puedes renombrar 'filename' como 'nombre' si lo deseas
        materia: file.materia,
        tema: file.tema,
        downloadUrl: `https://educationio.onrender.com/files/${file.id}/download`,
      }));
    
    } catch (error) {
      if (error instanceof TimeoutError) 
      {
        throw new RequestTimeoutException('La conexión con la base de datos está tardando demasiado. Intenta más tarde.');
      }
      if (error instanceof NotFoundException) 
      {
        throw error;
      }
      throw new InternalServerErrorException('Hubo un problema. Intenta más tarde.');
    }
  }
  
  /* Obtener archivos de Análisis Post Optimal IO1 */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  @Get('AnalisisPostOptimal')
  async getFilesAnalisisPostOptimal()
  {
    try 
    {
      const files = await this.filesService.getFilesAnalisisPostOptimalIO1();

      // Retorna solo los campos requeridos
      return files.map(file => ({
        id: file.id,
        nombre: file.filename,       // Puedes renombrar 'filename' como 'nombre' si lo deseas
        materia: file.materia,
        tema: file.tema,
        downloadUrl: `https://educationio.onrender.com/files/${file.id}/download`,
      }));
    
    } catch (error) {
      if (error instanceof TimeoutError) 
      {
        throw new RequestTimeoutException('La conexión con la base de datos está tardando demasiado. Intenta más tarde.');
      }
      if (error instanceof NotFoundException) 
      {
        throw error;
      }
      throw new InternalServerErrorException('Hubo un problema. Intenta más tarde.');
    }
  }
  
  /* Obtener archivos de Transporte, Asignación y Trasbordo IO1 */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  @Get('TransporteAsignacionTrasbordo')
  async getFilesTransporteAsignacionTrasbordo()
  {
    try 
    {
      const files = await this.filesService.getFilesTransporteAsignacionTrasbordoIO1();

      // Retorna solo los campos requeridos
      return files.map(file => ({
        id: file.id,
        nombre: file.filename,       // Puedes renombrar 'filename' como 'nombre' si lo deseas
        materia: file.materia,
        tema: file.tema,
        downloadUrl: `https://educationio.onrender.com/files/${file.id}/download`,
      }));
    
    } catch (error) {
      if (error instanceof TimeoutError) 
      {
        throw new RequestTimeoutException('La conexión con la base de datos está tardando demasiado. Intenta más tarde.');
      }
      if (error instanceof NotFoundException) 
      {
        throw error;
      }
      throw new InternalServerErrorException('Hubo un problema. Intenta más tarde.');
    }
  }

  /* Obtener archivos de Redes: PERT/CPM IO1 */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  @Get('RedesPERTCPM')
  async getFilesRedesPERTCPM()
  {
    try 
    {
      const files = await this.filesService.getFilesRedesPERTCPMIO1();

      // Retorna solo los campos requeridos
      return files.map(file => ({
        id: file.id,
        nombre: file.filename,       // Puedes renombrar 'filename' como 'nombre' si lo deseas
        materia: file.materia,
        tema: file.tema,
        downloadUrl: `https://educationio.onrender.com/files/${file.id}/download`,
      }));
    
    } catch (error) {
      if (error instanceof TimeoutError) 
      {
        throw new RequestTimeoutException('La conexión con la base de datos está tardando demasiado. Intenta más tarde.');
      }
      if (error instanceof NotFoundException) 
      {
        throw error;
      }
      throw new InternalServerErrorException('Hubo un problema. Intenta más tarde.');
    }
  }

    /* Obtener archivos de Markov IO2 */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  @Get('MarkovD')
  async getFilesMarkovD() 
  {
    try 
    {
      const files = await this.filesService.getFilesMarkovIO2D();
      console.log("estoy en markovD",files.toString());
      // Retorna solo los campos requeridos
      return files.map(file => ({
        id: file.id,
        nombre: file.filename,       // Puedes renombrar 'filename' como 'nombre' si lo deseas
        materia: file.materia,
        tema: file.tema,
      }));
    
    } catch (error) {
      if (error instanceof TimeoutError) 
      {
        throw new RequestTimeoutException('La conexión con la base de datos está tardando demasiado. Intenta más tarde.');
      }
      if (error instanceof NotFoundException) 
      {
        throw error;
      }
      throw new InternalServerErrorException('Hubo un problema. Intenta más tarde.');
    }
  }
  
  /* Obtener archivos de Colas IO2 */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  @Get('ColasD')
  async getFilesColasD() 
  {
    try 
    {
      const files = await this.filesService.getFilesColasIO2D();

      // Retorna solo los campos requeridos
      return files.map(file => ({
        id: file.id,
        nombre: file.filename,       // Puedes renombrar 'filename' como 'nombre' si lo deseas
        materia: file.materia,
        tema: file.tema,
      }));
      
    } catch (error) {
      if (error instanceof TimeoutError) 
      {
        throw new RequestTimeoutException('La conexión con la base de datos está tardando demasiado. Intenta más tarde.');
      }
      if (error instanceof NotFoundException) 
      {
        throw error;
      }
      throw new InternalServerErrorException('Hubo un problema. Intenta más tarde.');
    }
  }

  /* Obtener archivos de Simulacion IO2 */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  @Get('SimulacionD')
  async getFilesSimulacionD() 
  {
    try 
    {
      const files = await this.filesService.getFilesSimulacionIO2D();
        
      // Retorna solo los campos requeridos
      return files.map(file => ({
        id: file.id,
        nombre: file.filename,       // Puedes renombrar 'filename' como 'nombre' si lo deseas
        materia: file.materia,
        tema: file.tema,
      }));
      
    } catch (error) {
      if (error instanceof TimeoutError) 
      {
        throw new RequestTimeoutException('La conexión con la base de datos está tardando demasiado. Intenta más tarde.');
      }
      if (error instanceof NotFoundException) 
      {
        throw error;
      }
      throw new InternalServerErrorException('Hubo un problema. Intenta más tarde.');
    }
  }

  /* Obtener archivos de Decisiones IO2 */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  @Get('DecisionesD')
  async getFilesDecisionesD() 
  {
    try 
    {
      const files = await this.filesService.getFilesDecisionesIO2D();

      // Retorna solo los campos requeridos
      return files.map(file => ({
        id: file.id,
        nombre: file.filename,       // Puedes renombrar 'filename' como 'nombre' si lo deseas
        materia: file.materia,
        tema: file.tema,
      }));
      
    } catch (error) {
      if (error instanceof TimeoutError) 
      {
        throw new RequestTimeoutException('La conexión con la base de datos está tardando demasiado. Intenta más tarde.');
      }
      if (error instanceof NotFoundException) 
      {
        throw error;
      }
      throw new InternalServerErrorException('Hubo un problema. Intenta más tarde.');
    }
  }

  /* Obtener archivos de Inventarios IO2 */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  @Get('InventariosD')
async getFilesInventariosD() 
{
  try 
  {
    console.log("here5")
    const files = await this.filesService.getFilesInventariosIO2D();
    console.log(files.toString());
    // Retorna solo los campos requeridos
    return files.map(file => ({
      id: file.id,
      nombre: file.filename,       // Puedes renombrar 'filename' como 'nombre' si lo deseas
      materia: file.materia,
      tema: file.tema,
    }));
    
  } catch (error) {
    if (error instanceof TimeoutError) 
    {
      throw new RequestTimeoutException('La conexión con la base de datos está tardando demasiado. Intenta más tarde.');
    }
    if (error instanceof NotFoundException) 
    {
      throw error;
    }
    throw new InternalServerErrorException('Hubo un problema. Intenta más tarde.');
  }
}
  
  /* Obtener archivos de Programación Lineal y Dual IO1 */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  @Get('ProgramacionLinealD')
  async getFilesProgramacionLinealD()
  {
    try 
    {
      const files = await this.filesService.getFilesProgramacionLinealIO1D();

      // Retorna solo los campos requeridos
      return files.map(file => ({
        id: file.id,
        nombre: file.filename,       // Puedes renombrar 'filename' como 'nombre' si lo deseas
        materia: file.materia,
        tema: file.tema,
      }));
    
    } catch (error) {
      if (error instanceof TimeoutError) 
      {
        throw new RequestTimeoutException('La conexión con la base de datos está tardando demasiado. Intenta más tarde.');
      }
      if (error instanceof NotFoundException) 
      {
        throw error;
      }
      throw new InternalServerErrorException('Hubo un problema. Intenta más tarde.');
    }
  }
  
  /* Obtener archivos de Análisis Post Optimal IO1 */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  @Get('AnalisisPostOptimalD')
  async getFilesAnalisisPostOptimalD()
  {
    try 
    {
      const files = await this.filesService.getFilesAnalisisPostOptimalIO1D();

      // Retorna solo los campos requeridos
      return files.map(file => ({
        id: file.id,
        nombre: file.filename,       // Puedes renombrar 'filename' como 'nombre' si lo deseas
        materia: file.materia,
        tema: file.tema,
      }));
    
    } catch (error) {
      if (error instanceof TimeoutError) 
      {
        throw new RequestTimeoutException('La conexión con la base de datos está tardando demasiado. Intenta más tarde.');
      }
      if (error instanceof NotFoundException) 
      {
        throw error;
      }
      throw new InternalServerErrorException('Hubo un problema. Intenta más tarde.');
    }
  }
  
  /* Obtener archivos de Transporte, Asignación y Trasbordo IO1 */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  @Get('TransporteAsignacionTrasbordoD')
  async getFilesTransporteAsignacionTrasbordoD()
  {
    try 
    {
      const files = await this.filesService.getFilesTransporteAsignacionTrasbordoIO1D();

      // Retorna solo los campos requeridos
      return files.map(file => ({
        id: file.id,
        nombre: file.filename,       // Puedes renombrar 'filename' como 'nombre' si lo deseas
        materia: file.materia,
        tema: file.tema,
      }));
    
    } catch (error) {
      if (error instanceof TimeoutError) 
      {
        throw new RequestTimeoutException('La conexión con la base de datos está tardando demasiado. Intenta más tarde.');
      }
      if (error instanceof NotFoundException) 
      {
        throw error;
      }
      throw new InternalServerErrorException('Hubo un problema. Intenta más tarde.');
    }
  }

  /* Obtener archivos de Redes: PERT/CPM IO1 */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  @Get('RedesPERTCPMD')
  async getFilesRedesPERTCPMD()
  {
    try 
    {
      const files = await this.filesService.getFilesRedesPERTCPMIO1D();

      // Retorna solo los campos requeridos
      return files.map(file => ({
        id: file.id,
        nombre: file.filename,       // Puedes renombrar 'filename' como 'nombre' si lo deseas
        materia: file.materia,
        tema: file.tema,
      }));
    
    } catch (error) {
      if (error instanceof TimeoutError) 
      {
        throw new RequestTimeoutException('La conexión con la base de datos está tardando demasiado. Intenta más tarde.');
      }
      if (error instanceof NotFoundException) 
      {
        throw error;
      }
      throw new InternalServerErrorException('Hubo un problema. Intenta más tarde.');
    }
  }
}