import { Course } from 'src/entities';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'STUDENTS' })
export class Student {

	@PrimaryGeneratedColumn({ name: 'ID' })
	public id: number;

	@Column({ name: 'NAME' })
	public name: string;

	@Column({ name: 'SURNAME' })
	public surname: string;

	@Column({ name: 'SIDI_CODE' })
	public sidiCode: string;

	@Column({ name: 'TAX_CODE' })
	public taxCode: string;

	@JoinColumn({ name: 'CLASS_ID' })
	@ManyToOne(() => Course, course => course.students, {eager: true, lazy: false})
	public course: Course;

}
