import { HttpException, HttpStatus } from '@nestjs/common';

export class BusinessException extends HttpException {
  constructor(message: string, details?: string) {
    super(
      {
        message,
        error: 'Business Rule Violation',
        details,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class ValidationException extends HttpException {
  constructor(message: string, field?: string, value?: string) {
    super(
      {
        message,
        error: 'Validation Error',
        details: {
          field,
          value,
        },
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}

export class AuthenticationException extends HttpException {
  constructor(message: string = 'Token inválido ou expirado') {
    super(
      {
        message,
        error: 'Authentication Error',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export class AuthorizationException extends HttpException {
  constructor(message: string = 'Acesso negado') {
    super(
      {
        message,
        error: 'Authorization Error',
      },
      HttpStatus.FORBIDDEN,
    );
  }
}

export class ResourceNotFoundException extends HttpException {
  constructor(resource: string, id?: string | number) {
    super(
      {
        message: `${resource} não encontrado${id ? ` com ID: ${id}` : ''}`,
        error: 'Resource Not Found',
        details: {
          resource,
          id,
        },
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
