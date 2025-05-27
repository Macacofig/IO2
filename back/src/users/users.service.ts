import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  
/************************************************************************************************************/
/************************************************************************************************************/
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      // 1) Si no hay estudiantes en la tabla, guarda directamente
      const userCount = await this.userRepository.count();
      if (userCount === 0) {
        const firstUser = this.userRepository.create(createUserDto);
        return await this.userRepository.save(firstUser);
      }

      // 2) Si ya existen estudiantes, comprueba combinación phone–materia–paralelo
      const duplicate = await this.userRepository.findOne({
        where: {
          email: createUserDto.email,
          materia: createUserDto.materia,
          paralelo: createUserDto.paralelo,
        },
      });

      if (duplicate) {
        // Ya existe un usuario con la misma email, materia y paralelo
        throw new ConflictException('El usuario ya está inscrito en esa materia y paralelo');
      }

      // No hay duplicado: guarda normalmente
      const user = this.userRepository.create(createUserDto);
      return await this.userRepository.save(user);

    } catch (error) {
      // Si ya es una excepción controlada (ConflictException), la relanzamos
      if (error instanceof ConflictException) {
        throw error;
      }
      // Cualquier otro error inesperado:
      throw new InternalServerErrorException('No se pudo guardar el usuario');
    }
  }

/************************************************************************************************************/
/************************************************************************************************************/

  async loginSelect(email: string, materia: string, password: string): Promise<number> 
  {
    let number;
    if (email === 'rlujan@ucb.edu.bo')
    {
      if (password === 'InvestigacionOperativa')
      {
        number = 0;
      }
    }
    else
    {
      const user = await this.userRepository.findOne({
      where: { email: email, materia: materia },});
      if (!user) 
      {
        throw new NotFoundException({ message: 'Usuario no encontrado' });
      }
      else
      {
        if (materia === 'Investigacion Operativa 1')
        {
          number = 1;
        }
        if (materia === 'Investigacion Operativa 2')
        {
          number = 2;
        }
      }
    }
    return number;
  }
  /************************************************************************************************************/
  /************************************************************************************************************/
  async getParalelosByMateria(materia: string): Promise<string[]> {
    const users = await this.userRepository
      .createQueryBuilder('user')
      .select('DISTINCT user.paralelo', 'paralelo')
      .where('user.materia = :materia', { materia })
      .getRawMany();

    if (users.length === 0) {
      throw new NotFoundException({ message: 'No se encontraron paralelos para la materia especificada' });
    }

    return users.map(user => user.paralelo);
  }

  async deleteusersParaleloMateria(materia: string, paralelo: string): Promise<void> {
    const result = await this.userRepository.delete({ materia, paralelo });

    if (result.affected === 0) {
      throw new NotFoundException({ message: 'No se encontraron usuarios para eliminar con la materia y paralelo especificados' });
    }
  }
}