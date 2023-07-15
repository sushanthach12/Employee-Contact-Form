/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator'
import { CreateEmployee } from './CreateEmployee.dto'
import { Type } from 'class-transformer'
import { Contacts } from 'src/Typeorm'

export class EmployeeUpdateContact {

    @IsNotEmpty()
    @IsNumber()
    empid: number

    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => Contacts)
    contact: Contacts
}