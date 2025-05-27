import { Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import * as ExcelJS from 'exceljs';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

@Injectable()
export class UploadUsersService {
  constructor(private readonly usersService: UsersService) {}

  async processExcelFile(filePath: string, materia: string, paralelo: string) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.worksheets[0];

    const results: Array<
      | { row: number; status: 'invalid'; errors: ValidationError[] }
      | { row: number; status: 'created' }
      | { row: number; status: 'error'; message: string }
    > = [];

    for (let i = 2; i <= worksheet.rowCount; i++) 
    {
      const row = worksheet.getRow(i);
      const values = Array.isArray(row.values) ? row.values : [];
      const [nro, ESTUDIANTE, CARRERA, TELEFONO, email] = values.slice(1);

      const dto = plainToInstance(CreateUserDto, {
        fullName: ESTUDIANTE,
        career: CARRERA,
        phone: TELEFONO,
        email: email|| null,
        materia: materia,
        paralelo: paralelo,
      });

      const errors = await validate(dto);
      if (errors.length > 0) {
        results.push({ row: i, status: 'invalid', errors });
        continue;
      }

      try {
        const userWithRole = { ...dto };
        await this.usersService.create(userWithRole);
        results.push({ row: i, status: 'created' });
      } catch (err) {
        results.push({ row: i, status: 'error', message: err.message });
      }
    }

    return results;
  }
}