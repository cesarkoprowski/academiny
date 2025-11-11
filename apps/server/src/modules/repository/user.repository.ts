import Pessoa from 'common/entities/pessoa/pessoa.entity';
import UserCreateRequestDTO from 'modules/user-account/dto/request/user-create.request.dto';

export default interface IUserRepository {
  create(input: UserCreateRequestDTO): Promise<Pessoa>;
  getByEmail(input: string): Promise<Pessoa | null>;
}
