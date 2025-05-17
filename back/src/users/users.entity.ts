import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('users')
export class User {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  career: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  materia: string;

  @Column()
  paralelo: string;
}