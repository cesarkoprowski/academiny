import { UserJwt } from 'common/security/auth/type/user-jwt.type';

export interface AuthenticatedRequest extends Request {
  ['x-user']: UserJwt;
}
