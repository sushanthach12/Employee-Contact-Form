/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { Contacts } from 'src/Typeorm'

export class UpdateContactDTO {

    @IsNotEmpty()
    @IsNumber()
    contactId: number

    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => Contacts)
    contact: Contacts
}