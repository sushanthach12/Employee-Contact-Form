/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm'
import { Contacts } from '../contacts/Contacts.entity';

@Entity()
export class Employee {

    @PrimaryGeneratedColumn({ // to show in db we can use the object of the decorator
        type: 'bigint',
        name: 'emp_id',
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


    @OneToOne(() => Contacts)
    @JoinColumn()
    contactDetails: Contacts

}