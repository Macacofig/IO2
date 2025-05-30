import { Body, Controller, Post } from '@nestjs/common';
import { LinkesService } from './linkes.service';
import { LinkesDto } from './dto/linkes.dto';

@Controller('linkes')
export class LinkesController 
{
    constructor(private readonly filesService: LinkesService) {}

    /* Registar un nuevo link */
    /*********************************************************************************************************/
    /*********************************************************************************************************/
    @Post('register')
    async registerLink(@Body() dto: {link: string, materia: string, tema: string})
    {
        const { link, materia, tema } = dto;
        return this.filesService.createLink(link, materia, tema);
    }
}
