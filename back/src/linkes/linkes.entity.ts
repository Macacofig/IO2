import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('linkes')
export class LinkesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  link: string;

  @Column()
  nombre: string;

  @Column()
  materia: string;

  @Column()
  tema: string;
}