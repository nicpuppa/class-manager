import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Student, Class, AcademicYear } from 'src/entities';


@Entity({ name: 'ALUNNO_CLASSE' })
export class ClassEnrollment {

	@PrimaryGeneratedColumn({ name: 'ID' })
	public id: number;

	@JoinColumn({ name: 'ID_ALUNNO' })
	@ManyToOne(() => Student, student => student.enrollments)
	public student: Promise<Student>;

	@JoinColumn({ name: 'ID_ANNO_SCOL' })
	@ManyToOne(() => AcademicYear, academicYear => academicYear.enrollments)
	public academicYear: Promise<AcademicYear>;


	@JoinColumn({ name: 'ID_CLASSE' })
	@ManyToOne(() => Class, clazz => clazz.enrollments)
	public class: Promise<Class>;

}

