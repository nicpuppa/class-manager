import { Expose, Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class StudentDetailDTO {

	@Expose()
	@ApiProperty()
	public readonly id: number;

	@Expose()
	@ApiProperty()
	public readonly name: string;

	@Expose()
	@ApiProperty()
	public readonly surname: string;

	@Expose()
	@ApiProperty()
	public readonly sidiCode: string;

	@Expose()
	@ApiProperty()
	public readonly taxCode: string;

	@Expose({name: 'classId'})
	@ApiProperty({name: 'classId'})
	public readonly courseId: number;

	public constructor(args: Partial<StudentDetailDTO>) {
		Object.assign(this, args);
	}

}
