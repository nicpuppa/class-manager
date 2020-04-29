import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class CourseDTO {

	@Expose()
	public readonly id: number;

	@Expose({name: 'section'})
	public readonly name: string;

	@Expose({name: 'year'})
	public readonly grade: number;

	public constructor(args: Partial<CourseDTO>) {
		Object.assign(this, args);
	}

}
