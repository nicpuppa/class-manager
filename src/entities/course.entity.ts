import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany
} from 'typeorm';
import { Student } from '.';

@Entity({ name: 'CLASSES' })
export class Course {

	@PrimaryGeneratedColumn({ name: 'ID' })
	public id: number;

	@Column({ name: 'GRADE' })
	public grade: number;

	@Column({ name: 'NAME' })
	public name: string;

	@OneToMany(() => Student, student => student.course, {lazy: true})
	public students: Promise<Student[]>;

}
