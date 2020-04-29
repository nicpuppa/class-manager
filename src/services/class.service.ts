import { ClassDTO, ClassDetailDTO, StudentItemDTO } from 'src/dtos';
import { Repository } from 'typeorm';
import { Class } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { isNullOrUndefined } from 'util';

@Injectable()
export class ClassService {

	public constructor(@InjectRepository(Class) private readonly classRepository: Repository<Class>) {}

	/**
	 * find all classes in repository sorted by section and year
	 */
	public async findAll(): Promise<ClassDTO[]> {

		const classes = await this.classRepository
			.createQueryBuilder('clazz')
				.orderBy('clazz.name')
				.addOrderBy('clazz.grade')
			.getMany();

		return classes.map(c => new ClassDTO(c.id, c.name, c.grade));

	}

	/**
	 * find one class by id
	 */
	public async findById(id: number): Promise<ClassDetailDTO> {

		const clazz = await this.classRepository.findOne(id, {relations: ['students']});

		if (isNullOrUndefined(clazz)) return null;

		const students = await clazz.students;

		const studentDtos = (students || []).map(student => new StudentItemDTO(student.id, student.name, student.surname));

		const clazzDetailDto = new ClassDetailDTO(clazz.id, clazz.name, clazz.grade, studentDtos);

		return clazzDetailDto;

	}

}
