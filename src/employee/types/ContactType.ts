/* eslint-disable prettier/prettier */
import { Employee } from "src/Typeorm"

export interface ContactSaveType {

    primaryContactName: string
    primaryContactPhone: string
    primaryContactRelationship: string
    secondaryContactName: string
    secondaryContactPhone: string
    secondaryContactRelationship: string
    employee?: Employee
}
