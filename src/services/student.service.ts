import { StudentDetailDTO } from 'src/dtos';
import { Repository } from 'typeorm';
import { Student, Course } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { isNullOrUndefined } from 'util';
import { SaveStudentDTO } from 'src/dtos/save-student.dto';
import { StudentSearchDTO } from 'src/dtos/student-search.dto';

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

	public async findAll(student: StudentSearchDTO): Promise<StudentDetailDTO[]> {

		if (isNullOrUndefined(student)) throw new Error('student cannot be null');

		let query = await this.applyFilter(student);

		const students = await query.getMany();

		return students.map(student => this.studentToStudentDetailDto(student));
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
	public async addStudent(createStudentDTO: SaveStudentDTO): Promise<StudentDetailDTO> {

		if (isNullOrUndefined(createStudentDTO)) {
			throw new Error('student cannot be null');
		}

		let student = new Student();

		student = await this.saveOrUpdate(student, createStudentDTO);

		return this.studentToStudentDetailDto(student);

	}

	/**
	 * update student
	 *
	 * ### examples
	 *
	 * ```typescript
	 *
	 * const student = await studentService.updateStudent(1, {});
	 * console.log(student);
	 *
	 * ```
	 *
	 * @param id non-null
	 * @throws `Error` when id is null
	 */
	public async updateStudent(id: number, saveStudentDTO: SaveStudentDTO): Promise<StudentDetailDTO> {

		if (isNullOrUndefined(id)) {
			throw new Error(`id cannot be null`);
		}

		if (isNullOrUndefined(saveStudentDTO)) {
			throw new Error('student cannot be null');
		}

		let student = await this.studentRepository.findOne(id);

		student = await this.saveOrUpdate(student, saveStudentDTO);

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

	private async saveOrUpdate(student: Student, dto: SaveStudentDTO): Promise<Student> {

		const { name, surname, sidiCode, taxCode, courseId } = dto;

		student.name = name;
		student.surname = surname;
		student.sidiCode = sidiCode;
		student.taxCode = taxCode;
		student.course = null;

		if (!isNullOrUndefined(courseId)) {

			const course = await this.courseRepository.findOne(courseId);

			if (isNullOrUndefined(course)) {
				throw new NotFoundException('course');
			}

			student.course = course;

		}

		return await this.studentRepository.save(student);

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

	private async applyFilter(student: StudentSearchDTO) {
		let query = await this.studentRepository.createQueryBuilder('student');

		if (!isNullOrUndefined(student.id)) {
			query = query.andWhere('student.id = :id', { id: student.id });
		}

		if (!isNullOrUndefined(student.name)) {
			query = query.andWhere('student.name LIKE :name', { name: "%" + student.name + "%" });
		}

		if (!isNullOrUndefined(student.surname)) {
			query = query.andWhere('student.surname LIKE :surname', { name: "%" + student.surname + "%" });
		}
		return query;
	}

}
