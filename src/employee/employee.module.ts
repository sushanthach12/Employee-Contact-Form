/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { EmployeeController } from './controllers/employee.controller';
import { EmployeeService } from './services/employee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contacts, Employee } from 'src/Typeorm';
import { ContactsService } from 'src/contacts/services/contacts/contacts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Contacts])],
  controllers: [EmployeeController],
  providers: [
    {
      provide: 'EMPLOYEE_SERVICE',
      useClass: EmployeeService
    },
    {
      provide: 'CONTACTS_SERVICE',
      useClass: ContactsService
    },
  ],
})
export class EmployeeModule { }
