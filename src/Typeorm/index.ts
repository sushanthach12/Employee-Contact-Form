/* eslint-disable prettier/prettier */
import { Employee } from "./employee/employee.entity";

const entities = [Employee];

export { Employee }; // for independent imports... keeping the implementation hidden from other modules

export default entities;