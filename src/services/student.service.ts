import { StudentItemDTO, ClassDTO, StudentDetailDTO } from 'src/dtos';
import { Repository } from 'typeorm';
import { Student } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { constants } from 'src/constants/constants';
import { isNullOrUndefined } from 'util';

@Injectable()
export class StudentService {

	public constructor(@InjectRepository(Student) private readonly studentRepository: Repository<Student>) {}

	/**
	 * Find all students by class id
	 *
	 * ### examples
	 * ```typescript
	 *
	 * const students = await studentService.findAllByClassId(1);
	 * console.log(students);
	 *
	 * ```
	 *
	 * @param classId non-null
	 * @throws `Error` when id is null
	 */
	public async findAllByClassId(classId: number): Promise<StudentItemDTO[]> {

		if (isNullOrUndefined(classId)) throw new Error('classId cannot be null');

		const studentsByClass = await this.studentRepository
			.createQueryBuilder('student')
				.leftJoinAndSelect('student.enrollments', 'enrollment')
				.leftJoinAndSelect('enrollment.academicYear', 'academicYear')
				.leftJoinAndSelect('enrollment.class', 'class')
				.where('class.id = :classId and academicYear.id = :academicYearId', {academicYearId: constants.lastAcademicYearId, classId})
				.select('student')
				.orderBy('student.name')
				.addOrderBy('student.surname')
			.getMany();

		return studentsByClass
			.map(student => new StudentItemDTO(student.id, student.name, student.surname));

	}

	/**
	 * Find student by id
	 *
	 * ### examples
	 * ```typescript
	 *
	 * const student = await studentService.findById(1);
	 * console.log(student);
	 *
	 * ```
	 *
	 * @param id non-null
	 * @throws `Error` when id is null
	 */
	public async findById(id: number): Promise<StudentDetailDTO> {

		if (isNullOrUndefined(id)) throw new Error('id cannot be null');

		// retrieve student with latest enrollment
		const student = await this.studentRepository
		.createQueryBuilder('student')
			.leftJoinAndSelect('student.enrollments', 'enrollment')
			.leftJoinAndSelect('enrollment.academicYear', 'academicYear')
			.leftJoinAndSelect('enrollment.class', 'class')
			.where('student.id = :id and academicYear.id = :academicYearId', {academicYearId: constants.lastAcademicYearId, id})
		.getOne();

		// when student is null return undefined
		if (isNullOrUndefined(student)) return undefined;

		// enrollments contains at least one element. await keyword unwrap already fetched data.
		const enrollments = await student.enrollments;
		let classDTO: ClassDTO;

		if (enrollments.length > 0) {

			// await keyword unwrap already fetched data.
			const clazz = await enrollments[0].class;
			classDTO = new ClassDTO(
				clazz.id,
				clazz.section,
				clazz.year
			);
		}

		return new StudentDetailDTO(student.id, student.name, student.surname, student.sidiCode, student.taxCode, classDTO);

	}

}
