import {
  IsEmail,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {

  fullName: string;

  career: string;

  phone: string;

  @IsEmail()
  @IsOptional()
  email: string;

  materia: string;

  paralelo: string;
}