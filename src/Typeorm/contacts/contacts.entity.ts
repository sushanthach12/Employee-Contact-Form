/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinColumn, OneToOne } from 'typeorm'
import { Employee } from '../employee/employee.entity';

@Entity()
export class Contacts {

    @PrimaryGeneratedColumn({ // to show in db we can use the object of the decorator
        type: 'bigint',
        name: 'contact_id', // db name
    })
    contactId: number;

    @Column({
        name: 'primary_name',
        nullable: false,
    })
    primaryContactName: string;


    @Column({
        name: 'primary_phone',
        nullable: false,
    })
    primaryContactPhone: string;

    @Column({
        name: 'primary_relationship',
        nullable: false,
    })
    primaryContactRelationship: string;

    @Column({
        name: 'secondary_name',
        nullable: false,
    })
    secondaryContactName: string;


    @Column({
        name: 'secondary_phone',
        nullable: false,
    })
    secondaryContactPhone: string;

    @Column({
        name: 'secondary_relationship',
        nullable: false,
    })
    secondaryContactRelationship: string;


    // @OneToOne(() => Employee, employee => employee.contactDetails, { onDelete: 'CASCADE' })
    // @JoinColumn()
    // employee: Employee
}