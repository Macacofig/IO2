import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
async create(createUserDto: CreateUserDto): Promise<User> 
{
  try 
  {
    // Verifica cuántos usuarios hay
    const userCount = await this.userRepository.count();

    // Si ya hay usuarios, verifica si hay duplicados
    if (userCount > 0) 
    {
      const existingUser = await this.userRepository.findOne({
        where: { phone: createUserDto.phone.toString(), materia: createUserDto.materia }});
    }
    // Si no hay usuarios o no hay duplicados, se guarda el nuevo usuario
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);

  } catch (error) 
  {
    throw new InternalServerErrorException('No se pudo guardar el usuario');
  }
}

/************************************************************************************************************/
/************************************************************************************************************/

  async loginSelect(email: string, materia: string): Promise<any> 
  {
    const user = await this.userRepository.findOne({
      where: { email: email, materia: materia },});

    if (!user) 
    {
      throw new NotFoundException({ message: 'Usuario no encontrado' });
    }

    return { message: 'Usuario encontrado' };
  }
}