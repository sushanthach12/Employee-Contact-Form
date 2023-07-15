/* eslint-disable prettier/prettier */
import { Contacts } from "src/Typeorm"

export interface EmployeeSaveType {
    empfullname : string
    email : string
    jobtitle : string
    phonenumber : string
    address : string
    city : string
    state : string
    contactDetails?: Contacts
}
