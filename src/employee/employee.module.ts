/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { EmployeeController } from './controllers/employee.controller';
import { EmployeeService } from './services/employee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from 'src/Typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [EmployeeController],
  providers: [{
    provide: 'EMPLOYEE_SERVICE',
    useClass: EmployeeService
  }],
})
export class EmployeeModule { }
