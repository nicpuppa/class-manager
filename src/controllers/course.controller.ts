import { CourseService } from 'src/services';
import {
	Controller,
	Get,
	Param,
	NotFoundException,
	UseInterceptors,
	ClassSerializerInterceptor
} from '@nestjs/common';
import { CourseDTO } from 'src/dtos';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';

@ApiTags('classes')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('classes')
export class CourseController {

	public constructor(private readonly courseService: CourseService) {}

	@Get()
	@ApiCreatedResponse({ type: CourseDTO, isArray: true })
	public findAll(): Promise<CourseDTO[]> {
		return this.courseService.findAll();
	}

	@Get(':id')
	@ApiCreatedResponse({ type: CourseDTO })
	public async findById(@Param('id') id: number): Promise<CourseDTO> {

		const courseDetail = await this.courseService.findById(id);

		// return 404 http status when course not exists
		if (!courseDetail) throw new NotFoundException(`class ${id}`);

		return courseDetail;

	}

}
