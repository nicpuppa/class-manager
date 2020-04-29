import { ClassDTO } from '.';

export class StudentDetailDTO {

	public readonly class: ClassDTO;

	public constructor(
		public readonly id: number,
		public readonly name: string,
		public readonly surname: string,
		public readonly sidiCode: string,
		public readonly taxCode: string,
		public readonly classId: number
	) { }

}
