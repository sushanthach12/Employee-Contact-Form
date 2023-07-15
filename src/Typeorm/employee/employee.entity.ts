/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Employee {

    @PrimaryGeneratedColumn({ // to show in db we can use the object of the decorator
        type: 'bigint',
        name: 'emp_id', // db name
    })
    employeeId: number;

    @Column({
        name: 'employee_fullname',
        nullable: false,
        default: '',
    })
    empfullname: string;

    @Column({
        name: 'job_title',
        nullable: false,
        default: '',
    })
    jobtitle: string;

    
    @Column({
        name: 'phone_number',
        nullable: false,
    })
    phonenumber: string;

    
    @Column({
        name: 'email',
        nullable: false,
    })
    email: string;

    
    @Column({
        name: 'address',
        nullable: false,
    })
    address: string;

    
    @Column({
        name: 'city',
        nullable: false,
    })
    city: string;

    
    @Column({
        name: 'state',
        nullable: false,
    })
    state: string;

    
    @Column({
        name: 'primary_emergency_name',
        nullable: false,
    })
    primaryemergencyname: string;

    
    @Column({
        name: 'primary_emergency_phone',
        nullable: false,
    })
    primaryemergencyphone: string;

    @Column({
        name: 'primary_emergency_relationship',
        nullable: false,
    })
    primaryemergencyrelationship: string;

    @Column({
        name: 'secondary_emergency_name',
        nullable: false,
    })
    secondaryemergencyname: string;

    @Column({
        name: 'secondary_emergency_phone',
        nullable: false,
    })
    secondaryemergencyphone: string;

    
    @Column({
        name: 'secondary_emergency_relationship',
        nullable: false,
    })
    secondaryemergencyrelationship: string;

}