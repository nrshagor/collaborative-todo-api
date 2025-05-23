import { PartialType } from '@nestjs/mapped-types';
import { CreateToDoAppDto } from './create-to-do-app.dto';

export class UpdateToDoAppDto extends PartialType(CreateToDoAppDto) {}
