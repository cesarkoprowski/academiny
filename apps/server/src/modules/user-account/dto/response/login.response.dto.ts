import { IsString } from 'class-validator';

export default class LoginResponseDTO {
  @IsString()
  token: string;
}
