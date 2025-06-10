import { Body, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Post, RequestTimeoutException } from '@nestjs/common';
import { LinkesService } from './linkes.service';
import { LinkesDto } from './dto/linkes.dto';
import { TimeoutError } from 'rxjs';

@Controller('linkes')
export class LinkesController 
{
    constructor(private readonly linkesService: LinkesService) {}

    /* Registar un nuevo link */
    /*********************************************************************************************************/
    /*********************************************************************************************************/
    @Post('register')
    async registerLink(@Body() dto: {link: string, nombre:string, materia: string, tema: string})
    {
        const { link, nombre, materia, tema } = dto;
        return this.linkesService.createLink(link, nombre, materia, tema);
    }

    /* Eliminar Link */
    /*********************************************************************************************************/
    /*********************************************************************************************************/
    @Delete('delete')
    async deleteLink(@Body() body: { nombre: string }) 
    {
        const { nombre } = body;
        return this.linkesService.deleteLink(nombre);
    }
    /* Obtener archivos de Markov IO2 */
    /*********************************************************************************************************/
    /*********************************************************************************************************/
    @Get('MarkovD')
    async getFilesMarkovD() 
    {
        try 
        {
        const linkes = await this.linkesService.getFilesMarkovIO2D();

        // Retorna solo los campos requeridos
        return linkes.map(link => ({
            id: link.id,
            link: link.link,       
            materia: link.materia,
            tema: link.tema,
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
        const linkes = await this.linkesService.getFilesMarkovIO2D();

        // Retorna solo los campos requeridos
        return linkes.map(link => ({
            id: link.id,
            link: link.link,       
            materia: link.materia,
            tema: link.tema,
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
        const linkes = await this.linkesService.getFilesMarkovIO2D();

        // Retorna solo los campos requeridos
        return linkes.map(link => ({
            id: link.id,
            link: link.link,       
            materia: link.materia,
            tema: link.tema,
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
        const linkes = await this.linkesService.getFilesMarkovIO2D();

        // Retorna solo los campos requeridos
        return linkes.map(link => ({
            id: link.id,
            link: link.link,       
            materia: link.materia,
            tema: link.tema,
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
        const linkes = await this.linkesService.getFilesMarkovIO2D();

        // Retorna solo los campos requeridos
        return linkes.map(link => ({
            id: link.id,
            link: link.link,       
            materia: link.materia,
            tema: link.tema,
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
        const linkes = await this.linkesService.getFilesMarkovIO2D();

        // Retorna solo los campos requeridos
        return linkes.map(link => ({
            id: link.id,
            link: link.link,       
            materia: link.materia,
            tema: link.tema,
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
        const linkes = await this.linkesService.getFilesMarkovIO2D();

        // Retorna solo los campos requeridos
        return linkes.map(link => ({
            id: link.id,
            link: link.link,       
            materia: link.materia,
            tema: link.tema,
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
        const linkes = await this.linkesService.getFilesMarkovIO2D();

        // Retorna solo los campos requeridos
        return linkes.map(link => ({
            id: link.id,
            link: link.link,       
            materia: link.materia,
            tema: link.tema,
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
        const linkes = await this.linkesService.getFilesMarkovIO2D();

        // Retorna solo los campos requeridos
        return linkes.map(link => ({
            id: link.id,
            link: link.link,       
            materia: link.materia,
            tema: link.tema,
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
