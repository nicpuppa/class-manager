import { ClassDTO } from 'src/dtos';
import { Repository } from 'typeorm';
import { Class } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClassService {

	public constructor(@InjectRepository(Class) private readonly classRepository: Repository<Class>) {}

	/**
	 * find all classes in repository sorted by section and year
	 */
	public async findAll(): Promise<ClassDTO[]> {
		const classes = await this.classRepository
			.createQueryBuilder('clazz')
				.orderBy('clazz.section')
				.addOrderBy('clazz.year')
			.getMany();

		return classes.map(c => new ClassDTO(c.id, c.section, c.year));
	}

}
