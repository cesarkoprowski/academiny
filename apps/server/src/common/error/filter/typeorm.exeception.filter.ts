import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  ConflictException,
  InternalServerErrorException,
  HttpException,
  NotFoundException,
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

    if (postgresError.code === EErrorBDCodes.FOREIGN_KEY_ERROR) {
      errorResponse = new NotFoundException({
        message: 'Registro relacionado não encontrado',
        error: 'NotFound',
        details: this.extractKeyInfo(postgresError.detail || ''),
      } as ErrorResponse);
    } else if (postgresError.code === EErrorBDCodes.DUPLICATE_REGISTER_BD) {
      errorResponse = new ConflictException({
        message: 'Registro já existe',
        error: 'Conflict',
        details: this.extractKeyInfo(postgresError.detail || ''),
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

  private extractKeyInfo(detail: string): string | undefined {
    if (!detail) return undefined;

    // Extrai o campo e valor do erro
    // Ex: "Key (email)=(test@test.com) already exists."
    // Ex: "Key (professor_id)=(999) is not present in table "professor""
    const match = detail.match(/Key \(([^)]+)\)=\(([^)]+)\)/);

    if (match) {
      const [, field, value] = match;
      return `Campo '${field}' com valor '${value}'`;
    }

    return undefined;
  }
}
