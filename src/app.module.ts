import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
	StudentService,
	ClassService,
	ClassController,
	StudentController
} from './class-manager';

import * as path from 'path';

import {
	Class,
	AcademicYear,
	ClassEnrollment,
	Student
} from './entities';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'sqlite',
			autoLoadEntities: true,
			database: path.resolve(__dirname, '..', 'db.sqlite')
		}),
		TypeOrmModule.forFeature([Class, AcademicYear, ClassEnrollment, Student])
	],

	controllers: [ClassController, StudentController],
	providers: [ClassService, StudentService]
})
export class AppModule {}
