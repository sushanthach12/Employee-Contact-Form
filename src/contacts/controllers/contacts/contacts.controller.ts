/* eslint-disable prettier/prettier */
import {
    Body,
    Controller,
    HttpException,
    HttpStatus,
    Inject,
    Post,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { UpdateContactDTO } from 'src/contacts/dto/UpdateContact.dto';
import { ContactsService } from 'src/contacts/services/contacts/contacts.service';

@Controller('contacts')
export class ContactsController {

    constructor(@Inject('CONTACTS_SERVICE') private readonly contactService: ContactsService) { }

    @Post('/update')
    @UsePipes(ValidationPipe)
    async updateContact(@Body() contactDTO: UpdateContactDTO){
        const res = await this.contactService.updateContact(contactDTO.contactId, contactDTO.contact);

        if (res) return { "Success": true, "Contact": res };
        else if (res === undefined) return new HttpException({ "Error": true, "Msg": "Invalid Data Entry" }, HttpStatus.NOT_FOUND);
        else return new HttpException({ "Error": true, "Msg": "Internal Server Error" }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
