import { IsNotEmpty, IsString } from 'class-validator';

export class CreateToDoAppDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
