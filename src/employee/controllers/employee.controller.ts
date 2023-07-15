/* eslint-disable prettier/prettier */
import {
    Body,
    Controller,
    DefaultValuePipe,
    HttpException,
    HttpStatus,
    Inject,
    ParseIntPipe,
    Post,
    Query,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { EmployeeService } from '../services/employee.service';
import { CreateEmployee } from '../dto/CreateEmployee.dto';
import { PaginationOptions } from '../types/PaginationOptions';
import { EmployeeUpdate } from '../dto/EmployeUpdate.dto';
import { EmployeeUpdateContact } from '../dto/EmployeeUpdateContact.dto';

@Controller('employee')
export class EmployeeController {
    constructor(@Inject('EMPLOYEE_SERVICE') private readonly employeeService: EmployeeService) { }


    // Post : /api/employee/create
    @Post('/create')
    @UsePipes(ValidationPipe)
    createEmployee(@Body() createEmployeeDTO: CreateEmployee) {
        const res = this.employeeService.createEmployee(createEmployeeDTO);

        if (res) return { "Success": true, "Employee": res };
        else return new HttpException({ "Error": true, "Msg": "Internal Server Error" }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Post : /api/employee/getEmployees
    @Post('/getEmployees')
    async getEmployees() {
        const res = await this.employeeService.getEmployees();

        if (res) return { "Success": true, "Employee": res };
        else return new HttpException({ "Error": true, "Msg": "Internal Server Error" }, HttpStatus.INTERNAL_SERVER_ERROR);
    }


    // Post : /api/employee/getPaginatedEmployees?page=1&limit=10
    @Post('/getPaginatedEmployees')
    async getPaginatedEmployees(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    ) {
        const options: PaginationOptions = {
            page,
            limit
        }

        const res = await this.employeeService.getPaginatedEmployees(options);
        if (res) return { "Success": true, "Options": options, "Employee": res };
        else return new HttpException({ "Error": true, "Msg": "Internal Server Error" }, HttpStatus.INTERNAL_SERVER_ERROR);
    }



    // Post : /api/employee/getEmployee?empid=1
    //Pass empid as query param
    @Post('/getEmployee')
    async getEmployee(@Query('empid', ParseIntPipe) empid: number) {

        const res = await this.employeeService.getEmployee(empid);
        if (res) return { "Success": true, "Employee": res };
        else return new HttpException({ "Error": true, "Msg": "Internal Server Error" }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Post : /api/employee/update
    //Pass empid as query param
    @Post('/update')
    @UsePipes(ValidationPipe)
    async updateEmployee(@Body() employeUpdate: EmployeeUpdate) {
        const res = await this.employeeService.updateEmployee(employeUpdate.empid, employeUpdate.employee);
        if (res) return { "Success": true, "Employee": res };
        else if (res === undefined) return new HttpException({ "Error": true, "Msg": "Invalid Data Entry" }, HttpStatus.NOT_FOUND);
        else return new HttpException({ "Error": true, "Msg": "Internal Server Error" }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Post : /api/employee/updateContact
    //Pass empid as query param
    @Post('/updateContact')
    @UsePipes(ValidationPipe)
    async updateEmployeeContact(@Body() employeUpdate: EmployeeUpdateContact) {
        const res = await this.employeeService.updateContact(employeUpdate.empid, employeUpdate.contact);
        
        if (res) return { "Success": true, "Employee": res };
        else if (res === undefined) return new HttpException({ "Error": true, "Msg": "Invalid Data Entry" }, HttpStatus.NOT_FOUND);
        else return new HttpException({ "Error": true, "Msg": "Internal Server Error" }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Post('/delete')
    async deleteEmployee(@Query('empid', ParseIntPipe) empid: number) {
        const res = await this.employeeService.deleteEmployee(empid);

        if (res.Success) return { "Success": true, "Msg": res };
        else if (res.Error) return new HttpException({ "Error": true, "Msg": "Invalid Data Entry" }, HttpStatus.NOT_FOUND);
        else return new HttpException({ "Error": true, "Msg": "Internal Server Error" }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
