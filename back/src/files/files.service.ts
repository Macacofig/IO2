import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './files.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilesService {
    
constructor(@InjectRepository(FileEntity) private readonly filesRepository: Repository<FileEntity>) {}

  /* Registar un nuevo archivo en la base de datos */
  /*********************************************************************************************************/
  /*********************************************************************************************************/

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
    // console.log("superhere")
    // const algo =  await this.filesRepository.query('select * from files' );
    // algo.forEach((element: any) => {
    //   console.log(element);
    // })

    return await this.filesRepository.save(newFile);
  }

  /* Obtener un archivo por ID */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  async getFileById(id: number): Promise<FileEntity> 
  {
    const file = await this.filesRepository.findOneBy({ id });
    if (!file) {
      throw new Error(`File with id ${id} not found`);
    }
    return file;
  } 


  /* Obtener archivos de la Markov IO2 */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  
  async getFilesMarkovIO2(): Promise<FileEntity[]> 
  {
    return this.filesRepository
      .createQueryBuilder('file')
      .where('file.materia = :materia AND file.tema = :tema', {
        materia: 'Investigacion Operativa 2',
        tema: 'Cadenas de Markov',
      })
      .orderBy("SUBSTRING_INDEX(file.filename, '.', -1)", 'ASC') 
      .getMany();
  }

  /* Obtener archivos de la Colas IO2 */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  async getFilesColasIO2(): Promise<FileEntity[]> 
  {
    return this.filesRepository
      .createQueryBuilder('file')
      .where('file.materia = :materia AND file.tema = :tema', {
        materia: 'Investigacion Operativa 2',
        tema: 'Teoría de Líneas de Espera',
      })
      .orderBy("SUBSTRING_INDEX(file.filename, '.', -1)", 'ASC')
      .getMany();
  }

  /* Obtener archivos de la Simulacion IO2 */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  async getFilesSimulacionIO2(): Promise<FileEntity[]> 
  {
    return this.filesRepository
      .createQueryBuilder('file')
      .where('file.materia = :materia AND file.tema = :tema', {
        materia: 'Investigacion Operativa 2',
        tema: 'Simulación de Sistemas',
      })
      .orderBy("SUBSTRING_INDEX(file.filename, '.', -1)", 'ASC')
      .getMany();
  }

  /* Obtener archivos de la Decisiones IO2 */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  async getFilesDecisionesIO2(): Promise<FileEntity[]> 
  {
    return this.filesRepository
      .createQueryBuilder('file')
      .where('file.materia = :materia AND file.tema = :tema', {
        materia: 'Investigacion Operativa 2',
        tema: 'Toma de Decisiones Multicriterio',
      })
      .orderBy("SUBSTRING_INDEX(file.filename, '.', -1)", 'ASC')
      .getMany();
  }

  /* Obtener archivos de la Inventarios IO2 */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  async getFilesInventariosIO2(): Promise<FileEntity[]> 
  {
    return this.filesRepository
      .createQueryBuilder('file')
      .where('file.materia = :materia AND file.tema = :tema', {
        materia: 'Investigacion Operativa 2',
        tema: 'Gestión de Inventarios',
      })
      .orderBy("SUBSTRING_INDEX(file.filename, '.', -1)", 'ASC')
      .getMany();
  }

  /* Obtener archivos de Programación Lineal y Dual IO1 */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  async getFilesProgramacionLinealIO1(): Promise<FileEntity[]> 
  {
    return this.filesRepository
      .createQueryBuilder('file')
      .where('file.materia = :materia AND file.tema = :tema', {
        materia: 'Investigacion Operativa 1',
        tema: 'Programación Lineal y Dual',
      })
      .orderBy("SUBSTRING_INDEX(file.filename, '.', -1)", 'ASC')
      .getMany();
  }

  /* Obtener archivos de Post Optimal IO1 */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  async getFilesAnalisisPostOptimalIO1(): Promise<FileEntity[]> 
  {
    return this.filesRepository
      .createQueryBuilder('file')
      .where('file.materia = :materia AND file.tema = :tema', {
        materia: 'Investigacion Operativa 1',
        tema: 'Post Optimal',
      })
      .orderBy("SUBSTRING_INDEX(file.filename, '.', -1)", 'ASC')
      .getMany();
  }

  /* Obtener archivos de Asignación y Trasbordo IO1 */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  async getFilesTransporteAsignacionTrasbordoIO1(): Promise<FileEntity[]> 
  {
    return this.filesRepository
      .createQueryBuilder('file')
      .where('file.materia = :materia AND file.tema = :tema', {
        materia: 'Investigacion Operativa 1',
        tema: 'Asignación y Trasbordo',
      })
      .orderBy("SUBSTRING_INDEX(file.filename, '.', -1)", 'ASC')
      .getMany();
  }

  /* Obtener archivos de Redes: PERT/CPM IO1 */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  async getFilesRedesPERTCPMIO1(): Promise<FileEntity[]> 
  {
    return this.filesRepository
      .createQueryBuilder('file')
      .where('file.materia = :materia AND file.tema = :tema', {
        materia: 'Investigacion Operativa 1',
        tema: 'Redes: PERT/CPM',
      })
      .orderBy("SUBSTRING_INDEX(file.filename, '.', -1)", 'ASC')
      .getMany();
  }
  
  /* Obtener archivos de la Markov IO2 */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  
  async getFilesMarkovIO2D(): Promise<FileEntity[]> 
  {
    return this.filesRepository
      .createQueryBuilder('file')
      .where('file.materia = :materia AND file.tema = :tema', {
        materia: 'Investigacion Operativa 2',
        tema: 'Cadenas de Markov',
      })
      .orderBy("SUBSTRING_INDEX(file.filename, '.', -1)", 'ASC') 
      .getMany();
  }

  /* Obtener archivos de la Colas IO2 */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  async getFilesColasIO2D(): Promise<FileEntity[]> 
  {
    return this.filesRepository
      .createQueryBuilder('file')
      .where('file.materia = :materia AND file.tema = :tema', {
        materia: 'Investigacion Operativa 2',
        tema: 'Teoría de Líneas de Espera',
      })
      .orderBy("SUBSTRING_INDEX(file.filename, '.', -1)", 'ASC')
      .getMany();
  }

  /* Obtener archivos de la Simulacion IO2 */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  async getFilesSimulacionIO2D(): Promise<FileEntity[]> 
  {
    return this.filesRepository
      .createQueryBuilder('file')
      .where('file.materia = :materia AND file.tema = :tema', {
        materia: 'Investigacion Operativa 2',
        tema: 'Simulación de Sistemas',
      })
      .orderBy("SUBSTRING_INDEX(file.filename, '.', -1)", 'ASC')
      .getMany();
  }

  /* Obtener archivos de la Decisiones IO2 */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  async getFilesDecisionesIO2D(): Promise<FileEntity[]> 
  {
    return this.filesRepository
      .createQueryBuilder('file')
      .where('file.materia = :materia AND file.tema = :tema', {
        materia: 'Investigacion Operativa 2',
        tema: 'Toma de Decisiones Multicriterio',
      })
      .orderBy("SUBSTRING_INDEX(file.filename, '.', -1)", 'ASC')
      .getMany();
  }

  /* Obtener archivos de la Inventarios IO2 */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  async getFilesInventariosIO2D(): Promise<FileEntity[]> 
  {
    return this.filesRepository
      .createQueryBuilder('file')
      .where('file.materia = :materia AND file.tema = :tema', {
        materia: 'Investigacion Operativa 2',
        tema: 'Gestión de Inventarios',
      })
      .orderBy("SUBSTRING_INDEX(file.filename, '.', -1)", 'ASC')
      .getMany();
  }

  /* Obtener archivos de Programación Lineal y Dual IO1 */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  async getFilesProgramacionLinealIO1D(): Promise<FileEntity[]> 
  {
    return this.filesRepository
      .createQueryBuilder('file')
      .where('file.materia = :materia AND file.tema = :tema', {
        materia: 'Investigacion Operativa 1',
        tema: 'Programación Lineal y Dual',
      })
      .orderBy("SUBSTRING_INDEX(file.filename, '.', -1)", 'ASC')
      .getMany();
  }

  /* Obtener archivos de Post Optimal IO1 */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  async getFilesAnalisisPostOptimalIO1D(): Promise<FileEntity[]> 
  {
    return this.filesRepository
      .createQueryBuilder('file')
      .where('file.materia = :materia AND file.tema = :tema', {
        materia: 'Investigacion Operativa 1',
        tema: 'Post Optimal',
      })
      .orderBy("SUBSTRING_INDEX(file.filename, '.', -1)", 'ASC')
      .getMany();
  }

  /* Obtener archivos de Asignación y Trasbordo IO1 */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  async getFilesTransporteAsignacionTrasbordoIO1D(): Promise<FileEntity[]> 
  {
    return this.filesRepository
      .createQueryBuilder('file')
      .where('file.materia = :materia AND file.tema = :tema', {
        materia: 'Investigacion Operativa 1',
        tema: 'Asignación y Trasbordo',
      })
      .orderBy("SUBSTRING_INDEX(file.filename, '.', -1)", 'ASC')
      .getMany();
  }

  /* Obtener archivos de Redes: PERT/CPM IO1 */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  async getFilesRedesPERTCPMIO1D(): Promise<FileEntity[]> 
  {
    return this.filesRepository
      .createQueryBuilder('file')
      .where('file.materia = :materia AND file.tema = :tema', {
        materia: 'Investigacion Operativa 1',
        tema: 'Redes: PERT/CPM',
      })
      .orderBy("SUBSTRING_INDEX(file.filename, '.', -1)", 'ASC')
      .getMany();
  }
}
