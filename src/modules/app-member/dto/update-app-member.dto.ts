import { PartialType } from '@nestjs/mapped-types';
import { CreateAppMemberDto } from './create-app-member.dto';

export class UpdateAppMemberDto extends PartialType(CreateAppMemberDto) {}
