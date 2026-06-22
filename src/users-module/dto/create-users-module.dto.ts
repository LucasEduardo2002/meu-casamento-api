export class CreateUsersModuleDto {
  firstname: string;
  lastname: string;
  confirmed_presence?: boolean;
  email?: string;
  phone?: string;
  guest_count?: number;
  companion_names?: string;
  message?: string;
}

