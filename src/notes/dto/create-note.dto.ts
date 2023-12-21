import { IsNotEmpty, IsOptional } from 'class-validator';
import { Category } from 'src/category/entities/category.entity';

export class CreateNoteDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  note: string;

  @IsOptional()
  isArchive?: boolean;

  @IsNotEmpty()
  category: Category;
}
