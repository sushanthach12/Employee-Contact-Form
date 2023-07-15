/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator'
import { CreateEmployee } from './CreateEmployee.dto'
import { Type } from 'class-transformer'

export class EmployeeUpdate {

    @IsNotEmpty()
    @IsNumber()
    empid: number

    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => CreateEmployee)
    employee: CreateEmployee
}