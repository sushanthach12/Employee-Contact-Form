/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './Typeorm';
import { EmployeeModule } from './employee/employee.module';
import { ContactsModule } from './contacts/contacts.module';

@Module({
  imports: [
    EmployeeModule,
    ConfigModule.forRoot({
      envFilePath: '.env.local',
      isGlobal: true,
    }),
    ContactsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      // entities: [entities],
      entities,
      synchronize: true // false in production mode, so in production use migrations
    }),
  ],
})
export class AppModule { }
