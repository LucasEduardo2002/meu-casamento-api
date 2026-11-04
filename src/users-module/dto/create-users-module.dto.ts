export class CreateUsersModuleDto {
  name?: string;
  firstname?: string;
  lastname?: string;
  confirmed_presence?: boolean;
  has_absentees?: boolean;
  absent_names?: string;
  email?: string;
  phone?: string;
  guest_count?: number;
  companion_names?: string;
  message?: string;
}
