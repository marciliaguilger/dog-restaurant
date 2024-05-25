import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(TypeError)
export class TypeErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger(TypeErrorFilter.name);

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  catch(exception: TypeError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = 400;

    const body = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    };

    this.logger.error(exception, body);
    response.status(status).json(body);
  }
}