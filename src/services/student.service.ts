import { StudentDetailDTO } from 'src/dtos';
import { Repository } from 'typeorm';
import { Student, Course } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { isNullOrUndefined } from 'util';
import { CreateStudentDTO } from 'src/dtos/create-student.dto';

@Injectable()
export class StudentService {

	public constructor(
		@InjectRepository(Student) private readonly studentRepository: Repository<Student>,
		@InjectRepository(Course) private readonly courseRepository: Repository<Course>,
	) {}

	/**
	 * Find student by id
	 *
	 * ### examples
	 *
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
		const student = await this.studentRepository.findOne(id);

		return this.studentToStudentDetailDto(student);

	}

		/**
	 * add new student
	 *
	 * ### examples
	 *
	 * ```typescript
	 *
	 * const student = await studentService.addStudent({});
	 * console.log(student);
	 *
	 * ```
	 *
	 * @param id non-null
	 * @throws `Error` when id is null
	 */
	public async addStudent(createStudentDTO: CreateStudentDTO): Promise<StudentDetailDTO> {

		if (isNullOrUndefined(createStudentDTO)) {
			throw new Error('student cannot be null');
		}

		const { name, surname, sidiCode, taxCode, courseId } = createStudentDTO;

		let student = new Student();

		student.name = name;
		student.surname = surname;
		student.sidiCode = sidiCode;
		student.taxCode = taxCode;

		if (!isNullOrUndefined(courseId)) {

			const course = await this.courseRepository.findOne(courseId);

			if (isNullOrUndefined(course)) {
				throw new NotFoundException('course');
			}

			student.course = course;

		}

		student = await this.studentRepository.save(student);

		return this.studentToStudentDetailDto(student);

	}

	public async removeStudent(id: number): Promise<StudentDetailDTO> {

		const student = await this.studentRepository.findOne(id);

		if (isNullOrUndefined(student)) {
			throw new NotFoundException(`student ${id}`);
		}

		const response = {... student};

		await this.studentRepository.remove(student);

		return this.studentToStudentDetailDto(response);

	}


	private studentToStudentDetailDto(student: Student): StudentDetailDTO {

		if (isNullOrUndefined(student)) {
			return null;
		}

		const course = student.course;

		return new StudentDetailDTO({
			id: student.id,
			name: student.name,
			surname: student.surname,
			sidiCode: student.sidiCode,
			taxCode: student.taxCode,
			courseId : course ? course.id : undefined
		});

	}

}
