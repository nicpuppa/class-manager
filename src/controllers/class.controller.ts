import { ClassService } from 'src/services';
import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ClassDTO } from 'src/dtos';

@Controller('classes')
export class ClassController {

	public constructor(private readonly classService: ClassService) {}

	@Get()
	public findAll(): Promise<ClassDTO[]> {
		return this.classService.findAll();
	}

	@Get(':id')
	public async findById(@Param('id') id: number): Promise<ClassDTO> {

		const classDetail = await this.classService.findById(id);

		// return 404 http status when class not exists
		if (!classDetail) throw new NotFoundException(`Student ${id}`);

		return classDetail;

	}

}
