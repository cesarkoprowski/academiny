import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export default class CreateTeacherRequestDTO {
  @IsString()
  codigoCps: string;

  @IsEmail()
  email: string;

  @IsNumber()
  @IsOptional()
  id?: number;
}
