import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class StudentDetailDTO {

	@Expose()
	public readonly id: number;

	@Expose()
	public readonly name: string;

	@Expose()
	public readonly surname: string;

	@Expose()
	public readonly sidiCode: string;

	@Expose()
	public readonly taxCode: string;

	@Expose({name: 'classId'})
	public readonly courseId: number;

	public constructor(args: Partial<StudentDetailDTO>) {
		Object.assign(this, args);
	}

}
