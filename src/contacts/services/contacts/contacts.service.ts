/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/Typeorm';
import { Contacts, Contacts as ContactsEntity } from 'src/Typeorm/contacts/Contacts.entity';
import { UpdateContactDTO } from 'src/contacts/dto/UpdateContact.dto';
import { CreateEmployee } from 'src/employee/dto/CreateEmployee.dto';
import { ContactSaveType } from 'src/employee/types/ContactType';
import { Repository } from 'typeorm';

@Injectable()
export class ContactsService {
    constructor(@InjectRepository(ContactsEntity) private readonly contactsRepository: Repository<ContactsEntity>,) { }


    async saveContactEmp(DTO: CreateEmployee, employee: Employee) {

        const contact: ContactSaveType = {
            primaryContactName: DTO.primaryemergencyname,
            primaryContactPhone: DTO.primaryemergencyphone,
            primaryContactRelationship: DTO.primaryemergencyrelationship,
            secondaryContactName: DTO.secondaryemergencyname,
            secondaryContactPhone: DTO.secondaryemergencyphone,
            secondaryContactRelationship: DTO.secondaryemergencyrelationship,
        }
        const savedContact = this.contactsRepository.create(contact);
        const contacts = await this.contactsRepository.save(savedContact);
        
        return contacts
    }

    async updateContact(contactId: number, newContactData: Partial<Contacts>): Promise<Contacts> {
        const contact = await this.contactsRepository.createQueryBuilder('contact').where('contact.contactId = :contactId', { contactId }).getOne();
        console.log(contact)
        if(!contact) {
            return undefined;
        }

        Object.assign(contact, newContactData);

        const updatedContact = await this.contactsRepository.save(contact);

        return updatedContact
    }
}
