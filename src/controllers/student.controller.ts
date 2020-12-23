import { isNullOrUndefined } from 'util';
import { SaveStudentDTO } from 'src/dtos/save-student.dto';
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
	Delete,
	Put
} from '@nestjs/common';
import { StudentDetailDTO, } from 'src/dtos';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { StudentSearchDTO } from 'src/dtos/student-search.dto';

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

	@Get('name/:name')
	@ApiCreatedResponse({ type: StudentDetailDTO })
	public async findByName(@Param('name') name: string): Promise<StudentDetailDTO[]> {

		// find student by id
		const students = this.studentService.findByName(name);

		// return 404 http status when student not exists
		if (!students) throw new NotFoundException(`Student ${name}`);

		return students;

	}

	@Post()
	@ApiCreatedResponse({ type: StudentSearchDTO })
	public async findAll(@Body() student: StudentSearchDTO): Promise<StudentDetailDTO[]> {

		// find student by id
		const students = await this.studentService.findAll(student);

		// return 404 http status when student not exists
		if (!students) throw new NotFoundException(`Student ${student}`);

		return students;

	}

	@Post()
	@HttpCode(201)
	@ApiCreatedResponse({ type: StudentDetailDTO })
	public addStudent(@Body() student: SaveStudentDTO): Promise<StudentDetailDTO> {

		if (isNullOrUndefined(student)) {
			throw new BadRequestException(`empty body`);
		}

		return this.studentService.addStudent(student);

	}

	@Put(':id')
	@ApiCreatedResponse({ type: StudentDetailDTO })
	public updateStudentPut(@Param('id') id: number, @Body() student: SaveStudentDTO): Promise<StudentDetailDTO> {

		if (isNullOrUndefined(student)) {
			throw new BadRequestException(`empty body`);
		}

		return this.studentService.updateStudent(id, student);

	}

	@Post(':id')
	@ApiCreatedResponse({ type: StudentDetailDTO })
	public updateStudentPost(@Param('id') id: number, @Body() student: SaveStudentDTO): Promise<StudentDetailDTO> {

		if (isNullOrUndefined(student)) {
			throw new BadRequestException(`empty body`);
		}

		return this.studentService.updateStudent(id, student);

	}

	@Delete(':id')
	@ApiCreatedResponse({ type: StudentDetailDTO })
	public removeStudent(@Param('id') id: number): Promise<StudentDetailDTO> {

		return this.studentService.removeStudent(id);

	}

}
