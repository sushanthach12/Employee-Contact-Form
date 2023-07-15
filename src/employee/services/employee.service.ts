/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee, Employee as EmployeeEntity } from 'src/Typeorm';
import { CreateEmployee } from '../dto/CreateEmployee.dto';
import { Repository } from 'typeorm';
import { PaginationOptions } from '../types/PaginationOptions';

@Injectable()
export class EmployeeService {

    constructor(@InjectRepository(EmployeeEntity) private readonly employeeRepository: Repository<EmployeeEntity>,) { }

    createEmployee(DTO: CreateEmployee) {
        const newEmployee = this.employeeRepository.create(DTO);
        this.employeeRepository.save(newEmployee);

        return newEmployee;
    }

    async getEmployees(): Promise<Employee[]> {
        const employees: Employee[] = await this.employeeRepository.find();
        return employees;
    }

    async getPaginatedEmployees(options: PaginationOptions): Promise<Employee[]> {
        const employees = await this.employeeRepository
            .createQueryBuilder('employee')
            .take(options.limit)
            .skip((options.page - 1) * options.limit)
            .getMany();
        return employees;
    }

    async getEmployee(id: number): Promise<Employee> {
        const employee = await this.employeeRepository.createQueryBuilder('employee').where('employee.employeeId = :id', { id }).getOne();
        
        return employee;
    }

    async updateEmployee(id: number, newData: Partial<Employee>): Promise<Employee> {
        const employee = await this.employeeRepository.createQueryBuilder('employee').where('employee.employeeId = :id', { id }).getOne();
        if(!employee){
            return Promise.reject("Employee Not Found")
        }
        
        Object.assign(employee, newData);

        const updatedUser = await this.employeeRepository.save(employee);

        return updatedUser;
    }
}
