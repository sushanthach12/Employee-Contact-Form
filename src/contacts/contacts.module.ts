/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ContactsController } from './controllers/contacts/contacts.controller';
import { ContactsService } from './services/contacts/contacts.service';
import { Contacts } from 'src/Typeorm/contacts/Contacts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Contacts])],
  controllers: [ContactsController],
  providers: [{
    provide: 'CONTACTS_SERVICE',
    useClass: ContactsService
  }],
})
export class ContactsModule {}
