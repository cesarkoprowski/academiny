import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import AuthService from 'common/services/auth.service';
import { AuthenticationException } from 'common/error/exceptions/custom.exceptions';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'common/decorators/public.decorator';

@Injectable()
export default class AuthGuard implements CanActivate {
  constructor(
    @Inject(AuthService) private readonly authService: AuthService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(executionContext: ExecutionContext): boolean {
    const isPublic: boolean = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY,
      [executionContext.getHandler(), executionContext.getClass()],
    );

    if (isPublic) return true;

    const request: Request = executionContext.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader)
      throw new AuthenticationException('Token de autorização não fornecido');

    const token = authHeader.startsWith('Bearer ')
      ? authHeader.slice(7)
      : authHeader;

    if (!token) {
      throw new AuthenticationException(
        'Token não encontrado no header Authorization',
      );
    }

    try {
      const jwtDecoded = this.authService.verifyToken(token);

      if (!jwtDecoded) {
        throw new AuthenticationException('Token inválido');
      }

      request['user'] = jwtDecoded;

      return true;
    } catch (error) {
      if (error instanceof AuthenticationException) {
        throw error;
      }
      throw new AuthenticationException('Token inválido ou expirado');
    }
  }
}
