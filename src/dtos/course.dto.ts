import { Expose, Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class CourseDTO {

	@Expose()
	@ApiProperty()
	public readonly id: number;

	@Expose({name: 'section'})
	@ApiProperty({name: 'section'})
	public readonly name: string;

	@Expose({name: 'year'})
	@ApiProperty({name: 'year'})
	public readonly grade: number;

	public constructor(args: Partial<CourseDTO>) {
		Object.assign(this, args);
	}

}
