import { StudentItemDTO } from '.';
import { Expose, Exclude, Type } from 'class-transformer';

@Exclude()
export class CourseDetailDTO {

	@Expose()
	public readonly id: number;

	@Expose({name: 'section'})
	public readonly name: string;

	@Expose({name: 'year'})
	public readonly grade: number;

	@Expose()
	@Type(() => StudentItemDTO)
	public readonly students: StudentItemDTO[];

	public constructor(args: Partial<CourseDetailDTO>) {
		Object.assign(this, args);
	}

}
