import { IsEmail, IsString } from 'class-validator';

export default class CreateTeacherRequestDTO {
  @IsString()
  codigoCps: string;

  @IsEmail()
  email: string;
}
