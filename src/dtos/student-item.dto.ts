import { Expose, Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class StudentItemDTO {

	@Expose()
	@ApiProperty()
	public readonly id: number;

	@Expose()
	@ApiProperty()
	public readonly name: string;

	@Expose()
	@ApiProperty()
	public readonly surname: string;

	public constructor(args: Partial<StudentItemDTO>) {
		Object.assign(this, args);
	}

}
