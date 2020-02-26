import { ClassEnrollment } from 'src/entities';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'ALUNNO' })
export class Student {

	@PrimaryGeneratedColumn({ name: 'ID' })
	public id: number;

	@Column({ name: 'NOME' })
	public name: string;

	@Column({ name: 'COGNOME' })
	public surname: string;

	@Column({ name: 'CODICE_SIDI' })
	public sidiCode: string;

	@Column({ name: 'CODICE_FISCALE' })
	public taxCode: string;

	@OneToMany(() => ClassEnrollment, enrollment => enrollment.student, {lazy: true})
	public enrollments: Promise<ClassEnrollment[]>;

}
