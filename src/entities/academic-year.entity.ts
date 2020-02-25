import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import { ClassEnrollment } from "./class-enrollment.entity";

@Entity({ name: 'ANNO_SCOL' })
export class AcademicYear {

	@PrimaryGeneratedColumn({ name: 'ID' })
	public id: number;

	@Column({ name: 'ANNO_SCOL' })
	public year: number;

	@OneToMany(() => ClassEnrollment, enrollment => enrollment.academicYear)
	public enrollments: Promise<ClassEnrollment[]>;

}
