/* eslint-disable prettier/prettier */
import { Contacts } from "./contacts/Contacts.entity";
import { Employee } from "./employee/employee.entity";

const entities = [Employee, Contacts];

export { Employee, Contacts }; // for independent imports... keeping the implementation hidden from other modules

export default entities;