import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
	StudentService,
	CourseService,
	CourseController,
	StudentController,
	Course,
	Student
} from './class-manager';

import * as path from 'path';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'sqlite',
			autoLoadEntities: true,
			database: path.resolve(__dirname, '..', 'db.sqlite')
		}),
		TypeOrmModule.forFeature([Course, Student])
	],

	controllers: [CourseController, StudentController],
	providers: [CourseService, StudentService]
})
export class AppModule {}
