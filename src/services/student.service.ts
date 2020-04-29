import { StudentDetailDTO } from 'src/dtos';
import { Repository } from 'typeorm';
import { Student } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { isNullOrUndefined } from 'util';

@Injectable()
export class StudentService {

	public constructor(@InjectRepository(Student) private readonly studentRepository: Repository<Student>) {}

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

		// when student is null return undefined
		if (isNullOrUndefined(student)) return undefined;

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
