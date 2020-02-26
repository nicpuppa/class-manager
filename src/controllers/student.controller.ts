import { StudentService } from 'src/services';
import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { StudentItemDTO, StudentDetailDTO } from 'src/dtos';

@Controller()
export class StudentController {

	public constructor(private readonly studentService: StudentService) {}

	@Get('classes/:classId/students')
	public findAllByClassId(@Param('classId') classId: number): Promise<StudentItemDTO[]> {

		return this.studentService.findAllByClassId(classId);

	}

	@Get('students/:id')
	public async findById(@Param('id') id: number): Promise<StudentDetailDTO> {

		// find student by id
		const studentDetail = await this.studentService.findById(id);

		// return 404 http status when student not exists
		if (!studentDetail) throw new NotFoundException(`Student ${id}`);

		return studentDetail;

	}

}
