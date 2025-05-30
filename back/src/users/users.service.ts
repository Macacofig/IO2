import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
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

  async loginSelect(email: string, materia: string, password: string): Promise<{ tipo: number }> {
  if (email === 'rlujan@ucb.edu.bo') {
    if (password === 'InvestigacionOperativa') {
      return { tipo: 0 }; // Admin o docente
    } else {
      throw new UnauthorizedException('Contraseña incorrecta');
    }
  } else {
    const user = await this.userRepository.findOne({ where: { email, materia } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (materia === 'Investigacion Operativa 1') {
      return { tipo: 1 }; // Estudiante IO1
    } else if (materia === 'Investigacion Operativa 2') {
      return { tipo: 2 }; // Estudiante IO2
    } else {
      throw new BadRequestException('Materia no reconocida');
    }
  }
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