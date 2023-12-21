import { IsNotEmpty, IsOptional } from 'class-validator';
export class CreateNoteDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  note: string;

  @IsOptional()
  isArchive?: boolean;
}
