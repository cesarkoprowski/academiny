import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  ConflictException,
  InternalServerErrorException,
  HttpException,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { EErrorBDCodes } from '../enum/error-codes-bd.enum';
import { Response, Request } from 'express';

interface PostgresError extends QueryFailedError {
  code?: string;
  detail?: string;
  constraint?: string;
}

interface ErrorResponse {
  message: string;
  error: string;
  details?: string;
}

@Catch(QueryFailedError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let errorResponse: HttpException;

    const postgresError = exception as PostgresError;

    if (postgresError.code === EErrorBDCodes.DUPLICATE_REGISTER_BD) {
      errorResponse = new ConflictException({
        message: 'Registro duplicado. Este item já existe no sistema.',
        error: 'Conflict',
        details: this.extractDuplicateField(postgresError.detail || ''),
      } as ErrorResponse);
    } else {
      errorResponse = new InternalServerErrorException({
        message: 'Erro interno do banco de dados',
        error: 'Internal Server Error',
        details:
          process.env.NODE_ENV === 'development'
            ? exception.message
            : undefined,
      } as ErrorResponse);
    }

    const status = errorResponse.getStatus();
    const errorBody = errorResponse.getResponse() as ErrorResponse;

    response.status(status).json({
      statusCode: status,
      message: errorBody.message,
      error: errorBody.error,
      details: errorBody.details,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }

  private extractDuplicateField(detail: string): string | undefined {
    if (!detail) return undefined;

    // Extrai o campo duplicado da mensagem de erro do PostgreSQL
    // Ex: "Key (email)=(test@test.com) already exists."
    const match = detail.match(/Key \(([^)]+)\)/);
    return match ? `Campo '${match[1]}' já existe` : 'Campo duplicado';
  }
}
