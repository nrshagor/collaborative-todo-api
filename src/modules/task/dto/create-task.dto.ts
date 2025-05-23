import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsDateString,
  IsInt,
} from 'class-validator';

export class CreateTaskDto {
  @IsUUID()
  appId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(['in-progress', 'stale', 'completed'])
  status?: 'in-progress' | 'stale' | 'completed';

  @IsOptional()
  @IsDateString()
  due_date?: Date;

  @IsOptional()
  @IsInt()
  priority?: number;
}
