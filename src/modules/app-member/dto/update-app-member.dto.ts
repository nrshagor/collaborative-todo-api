import { IsEnum, IsUUID } from 'class-validator';
import { AppMemberRole } from './create-app-member.dto';

export class UpdateAppMemberDto {
  @IsEnum(AppMemberRole)
  role: AppMemberRole;

  @IsUUID()
  appId: string;
}
