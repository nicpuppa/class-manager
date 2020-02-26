import { ClassService } from 'src/services';
import { Controller, Get } from '@nestjs/common';
import { ClassDTO } from 'src/dtos';

@Controller('classes')
export class ClassController {

	public constructor(private readonly classService: ClassService) {}

	@Get()
	public findAll(): Promise<ClassDTO[]> {
		return this.classService.findAll();
	}

}
