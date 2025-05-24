import { IsOptional, IsString, IsEnum, IsDateString, IsInt } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

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
