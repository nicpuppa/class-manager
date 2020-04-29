import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, IsOptional } from 'class-validator';

@Exclude()
export class CreateStudentDTO {

	@IsNotEmpty()
	@IsString()
	@Expose()
	@ApiProperty({required: true})
	public readonly name: string;

	@IsNotEmpty()
	@IsString()
	@Expose()
	@ApiProperty({required: true})
	public readonly surname: string;

	@IsNotEmpty()
	@IsString()
	@Expose()
	@ApiProperty({required: true})
	public readonly sidiCode: string;

	@IsNotEmpty()
	@IsString()
	@Expose()
	@ApiProperty({required: true})
	public readonly taxCode: string;


	@IsInt()
	@IsOptional()
	@Expose({name: 'classId'})
	@ApiProperty({name: 'classId'})
	public readonly courseId: number;

}
