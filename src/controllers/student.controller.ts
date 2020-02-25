import { StudentService } from './../services/student.service';
import { Controller, Get, Param, NotFoundException } from "@nestjs/common";
import { StudentItemDTO } from 'src/dtos';
import { StudentDetailDTO } from 'src/dtos/student-detail.dto';

@Controller()
export class StudentController {

	public constructor(private readonly studentService: StudentService) {}

	@Get('classes/:classId/students')
	public findAllByClassId(@Param('classId') classId: number): Promise<StudentItemDTO[]> {

		return this.studentService.findAllByClassId(classId);

	}

	@Get('students/:id')
	public async findAll(@Param('id') id: number): Promise<StudentDetailDTO> {

		// find students by id
		const studentDetail = await this.studentService.findOne(id);

		// return 404 http status when student not exists
		if (!studentDetail) throw new NotFoundException(`Student ${id}`);

		return studentDetail;

	}

}
