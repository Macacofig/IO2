import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LinkesEntity } from './linkes.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LinkesService {

  constructor(@InjectRepository(LinkesEntity) private readonly linkesRepository: Repository<LinkesEntity>) {}

  /* Registar un nuevo link */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  async createLink(link: string,nombre:string, materia: string, tema: string): Promise<any> 
  {
    const newLink = this.linkesRepository.create({link, nombre, materia, tema});
    return await this.linkesRepository.save(newLink);
  }
  
/* Obtener archivos de la Markov IO2 */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  async deleteLink(nombre: string): Promise<void>
  {
    const link = await this.linkesRepository.findOne({ where: { nombre } });
  
    if (!link) {
      throw new NotFoundException('No se encontró un link con ese nombre');
    }
  
    await this.linkesRepository.remove(link);  
  }  
  
  /* Obtener archivos de la Markov IO2 */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  
  async getFilesMarkovIO2D(): Promise<LinkesEntity[]> 
  {
    return this.linkesRepository
      .createQueryBuilder('linkes')
      .where('linkes.materia = :materia AND linkes.tema = :tema', {
        materia: 'Investigacion Operativa 2',
        tema: 'Cadenas de Markov',
      })
      .orderBy('linkes.nombre', 'ASC')
      .getMany();
  }

  /* Obtener archivos de la Colas IO2 */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  async getFilesColasIO2D(): Promise<LinkesEntity[]> 
  {
    return this.linkesRepository
      .createQueryBuilder('linkes')
      .where('linkes.materia = :materia AND linkes.tema = :tema', {
        materia: 'Investigacion Operativa 2',
        tema: 'Teoría de Líneas de Espera',
      })
      .orderBy('linkes.nombre', 'ASC') // ← Ordena por nombre completo
    .getMany();
  }

  /* Obtener archivos de la Simulacion IO2 */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  async getFilesSimulacionIO2D(): Promise<LinkesEntity[]> 
  {
    return this.linkesRepository
      .createQueryBuilder('linkes')
      .where('linkes.materia = :materia AND linkes.tema = :tema', {
        materia: 'Investigacion Operativa 2',
        tema: 'Simulación de Sistemas',
      })
      .orderBy('linkes.nombre', 'ASC') // ← Ordena por nombre completo
    .getMany();
  }

  /* Obtener archivos de la Decisiones IO2 */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  async getFilesDecisionesIO2D(): Promise<LinkesEntity[]> 
  {
    return this.linkesRepository
      .createQueryBuilder('linkes')
      .where('linkes.materia = :materia AND linkes.tema = :tema', {
        materia: 'Investigacion Operativa 2',
        tema: 'Toma de Decisiones Multicriterio',
      })
      .orderBy('linkes.nombre', 'ASC') // ← Ordena por nombre completo
    .getMany();
  }

  /* Obtener archivos de la Inventarios IO2 */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  async getFilesInventariosIO2D(): Promise<LinkesEntity[]> 
  {
    return this.linkesRepository
      .createQueryBuilder('linkes')
      .where('linkes.materia = :materia AND linkes.tema = :tema', {
        materia: 'Investigacion Operativa 2',
        tema: 'Gestión de Inventarios',
      })
      .orderBy('linkes.nombre', 'ASC') // ← Ordena por nombre completo
    .getMany();
  }

  /* Obtener archivos de Programación Lineal y Dual IO1 */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  async getFilesProgramacionLinealIO1D(): Promise<LinkesEntity[]> 
  {
    return this.linkesRepository
      .createQueryBuilder('linkes')
      .where('linkes.materia = :materia AND linkes.tema = :tema', {
        materia: 'Investigacion Operativa 1',
        tema: 'Programación Lineal y Dual',
      })
      .orderBy('linkes.nombre', 'ASC') // ← Ordena por nombre completo
    .getMany();
  }

  /* Obtener archivos de Post Optimal IO1 */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  async getFilesAnalisisPostOptimalIO1D(): Promise<LinkesEntity[]> 
  {
    return this.linkesRepository
      .createQueryBuilder('linkes')
      .where('linkes.materia = :materia AND linkes.tema = :tema', {
        materia: 'Investigacion Operativa 1',
        tema: 'Análisis Post Optimal',
      })
      .orderBy('linkes.nombre', 'ASC') // ← Ordena por nombre completo
    .getMany();
  }

  /* Obtener archivos de Asignación y Trasbordo IO1 */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  async getFilesTransporteAsignacionTrasbordoIO1D(): Promise<LinkesEntity[]> 
  {
    return this.linkesRepository
      .createQueryBuilder('linkes')
      .where('linkes.materia = :materia AND linkes.tema = :tema', {
        materia: 'Investigacion Operativa 1',
        tema: 'Asignación y Trasbordo',
      })
      .orderBy('linkes.nombre', 'ASC') // ← Ordena por nombre completo
    .getMany();
  }

  /* Obtener archivos de Redes: PERT/CPM IO1 */
  /*********************************************************************************************************/
  /*********************************************************************************************************/
  async getFilesRedesPERTCPMIO1D(): Promise<LinkesEntity[]> 
  {
    return this.linkesRepository
      .createQueryBuilder('linkes')
      .where('linkes.materia = :materia AND linkes.tema = :tema', {
        materia: 'Investigacion Operativa 1',
        tema: 'Redes: PERT/CPM',
      })
      .orderBy('linkes.nombre', 'ASC') // ← Ordena por nombre completo
    .getMany();
  }
}
