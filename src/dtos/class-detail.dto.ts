import { StudentItemDTO } from '.';

export class ClassDetailDTO {

	public constructor(
		public readonly id: number,
		public readonly section: string,
		public readonly year: number,
		public readonly students: StudentItemDTO[]
	) {}

}
