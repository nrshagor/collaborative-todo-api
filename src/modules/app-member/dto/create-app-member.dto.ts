import { IsUUID, IsEnum } from 'class-validator';

export enum AppMemberRole {
  OWNER = 'owner',
  ADMIN = 'admin',
  EDITOR = 'editor',
  VIEWER = 'viewer',
}

export class CreateAppMemberDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  appId: string;

  @IsEnum(AppMemberRole)
  role: AppMemberRole;
}
