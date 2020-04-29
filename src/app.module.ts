import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
	StudentService,
	ClassService,
	ClassController,
	StudentController,
	Class,
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
		TypeOrmModule.forFeature([Class, Student])
	],

	controllers: [ClassController, StudentController],
	providers: [ClassService, StudentService]
})
export class AppModule {}
