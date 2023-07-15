/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsNumber, IsNumberString, MinLength } from 'class-validator'

export class CreateEmployee {

    @IsNotEmpty()
    empfullname: string;

    @IsNotEmpty()
    jobtitle: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsNumberString()
    @MinLength(10)
    phonenumber: string;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    city: string;

    @IsNotEmpty()
    state: string;

    @IsNotEmpty()
    primaryemergencyname: string;

    @IsNotEmpty()
    @IsNumberString()
    @MinLength(10)
    primaryemergencyphone: string;

    @IsNotEmpty()
    primaryemergencyrelationship: string;

    
    @IsNotEmpty()
    secondaryemergencyname: string;

    @IsNotEmpty()
    @IsNumberString()
    @MinLength(10)
    secondaryemergencyphone: string;

    @IsNotEmpty()
    secondaryemergencyrelationship: string;
}