import { ClassService } from '../services/class.service';
import { Controller, Get } from "@nestjs/common";
import { ClassDTO } from 'src/dtos/class.dto';

@Controller('classes')
export class ClassController {

	public constructor(private readonly classService: ClassService) {}

	@Get()
	public findAll(): Promise<ClassDTO[]> {
		return this.classService.findAll();
	}

}
