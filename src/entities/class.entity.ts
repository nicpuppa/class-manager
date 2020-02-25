import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ClassEnrollment } from './class-enrollment.entity';

@Entity({ name: 'CLASSE' })
export class Class {

	@PrimaryGeneratedColumn({ name: 'ID' })
	public id: number;

	@Column({ name: 'ANNO' })
	public year: number;

	@Column({ name: 'SEZIONE' })
	public section: string;

	@OneToMany(() => ClassEnrollment, enrollment => enrollment.class, {lazy: true})
	public enrollments: Promise<ClassEnrollment[]>;

}
