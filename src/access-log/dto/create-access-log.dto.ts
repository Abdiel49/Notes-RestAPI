import { IsNotEmpty, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class CreateAccessLogDto {
  @IsUUID()
  user: UUID;

  @IsNotEmpty()
  lat: string;

  @IsNotEmpty()
  long: string;
}
