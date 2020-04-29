import { isNullOrUndefined } from 'util';
import { CreateStudentDTO } from 'src/dtos/create-student.dto';
import { StudentService } from 'src/services';
import {
	Controller,
	Get,
	Param,
	NotFoundException,
	UseInterceptors,
	ClassSerializerInterceptor,
	Post,
	Body,
	BadRequestException,
	HttpCode,
	Delete
} from '@nestjs/common';
import { StudentDetailDTO } from 'src/dtos';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('students')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('students')
export class StudentController {

	public constructor(private readonly studentService: StudentService) {}

	@Get(':id')
	@ApiCreatedResponse({ type: StudentDetailDTO })
	public async findById(@Param('id') id: number): Promise<StudentDetailDTO> {

		// find student by id
		const studentDetail = await this.studentService.findById(id);

		// return 404 http status when student not exists
		if (!studentDetail) throw new NotFoundException(`Student ${id}`);

		return studentDetail;

	}

	@Post()
	@HttpCode(201)
	@ApiCreatedResponse({ type: StudentDetailDTO })
	public addStudent(@Body() student: CreateStudentDTO): Promise<StudentDetailDTO> {

		if (isNullOrUndefined(student)) {
			throw new BadRequestException(`empty body`);
		}

		return this.studentService.addStudent(student);

	}

	@Delete(':id')
	@ApiCreatedResponse({ type: StudentDetailDTO })
	public removeStudent(@Param('id') id: number): Promise<StudentDetailDTO> {

		return this.studentService.removeStudent(id);

	}

}
