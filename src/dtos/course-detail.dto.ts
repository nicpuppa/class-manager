import { StudentItemDTO } from '.';
import { Expose, Exclude, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class CourseDetailDTO {

	@Expose()
	@ApiProperty()
	public readonly id: number;

	@Expose({name: 'section'})
	@ApiProperty({name: 'section'})
	public readonly name: string;

	@Expose({name: 'year'})
	@ApiProperty({name: 'year'})
	public readonly grade: number;

	@Expose()
	@Type(() => StudentItemDTO)
	@ApiProperty()
	public readonly students: StudentItemDTO[];

	public constructor(args: Partial<CourseDetailDTO>) {
		Object.assign(this, args);
	}

}
