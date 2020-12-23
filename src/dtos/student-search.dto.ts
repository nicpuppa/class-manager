import { Expose, Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, IsOptional } from 'class-validator';

@Exclude()
export class StudentSearchDTO {

	@IsOptional()
	@Expose()
	@ApiProperty({required: false})
	public readonly id?: number;

	@IsOptional()
	@Expose()
	@ApiProperty({required: false})
	public readonly name?: string;

	@IsOptional()
	@Expose()
	@ApiProperty({required: false})
	public readonly surname?: string;

	public constructor(args: Partial<StudentSearchDTO>) {
		Object.assign(this, args);
	}

}
