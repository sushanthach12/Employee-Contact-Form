/* eslint-disable prettier/prettier */
import { Injectable , Inject} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contacts, Employee, Employee as EmployeeEntity } from 'src/Typeorm';
import { CreateEmployee } from '../dto/CreateEmployee.dto';
import { QueryBuilder, Repository } from 'typeorm';
import { PaginationOptions } from '../types/PaginationOptions';
import { ContactsService } from 'src/contacts/services/contacts/contacts.service';
import { EmployeeSaveType } from '../types/Employee';

@Injectable()
export class EmployeeService {

    constructor(
        @InjectRepository(EmployeeEntity) private readonly employeeRepository: Repository<EmployeeEntity>,
        @Inject('CONTACTS_SERVICE') private readonly contactsService: ContactsService,
    ) { }

    async createEmployee(DTO: CreateEmployee) {
        try {
            
            const employeeData: EmployeeSaveType = {
                empfullname : DTO.empfullname,
                email : DTO.email,
                jobtitle : DTO.jobtitle,
                phonenumber : DTO.phonenumber,
                address : DTO.address,
                city : DTO.city,
                state : DTO.state,
            }
            const savedEmployee = this.employeeRepository.create(employeeData);
            const savedContact = await this.contactsService.saveContactEmp(DTO, savedEmployee);
            savedEmployee.contactDetails = savedContact

            await this.employeeRepository.save(savedEmployee)


            return savedEmployee;
        } catch (error) {
            throw error
        }


    }

    async getEmployees(): Promise<Employee[]> {
        const employees: Employee[] = await this.employeeRepository.find({
            relations: {
                contactDetails: true
            }
        });
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
        if (!employee) {
            return Promise.reject("Employee Not Found")
        }

        Object.assign(employee, newData);

        const updatedUser = await this.employeeRepository.save(employee);

        return updatedUser;
    }

    async deleteEmployee(empid: number) {
        const employee = await this.employeeRepository.createQueryBuilder('employee').where('employee.employeeId = :empid', { empid }).getOne();

        if (!employee) {
            return { "Error": true, "Msg": "Not Found" }
        }
        await this.employeeRepository.remove(employee);

        return { "Success": true, "Msg": "Deleted Successfully" }
    }

    async updateContact(empid: number, newContactData: Partial<Contacts>) {
        const employee = await this.employeeRepository.findOne({
            where: {
                employeeId: empid
            },
            relations: {
                contactDetails: true
            }
            
        })

        if(!employee) {
            return undefined;
        }

        const updatedContact = await this.contactsService.updateContact(empid, newContactData);
        console.log(updatedContact)
        const contactDetails = employee.contactDetails
        Object.assign(contactDetails, updatedContact)

        const updated = await this.employeeRepository.save(employee);
        console.log(updated)

        return updated
    }
}
