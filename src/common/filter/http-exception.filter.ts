import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common'
import { SentryService } from '@ntegral/nestjs-sentry'
import { Response } from 'express'

interface HttpExceptionResponse {
  message: string
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly sentry: SentryService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    let status: HttpStatus
    let errorMessage: string

    if (exception instanceof HttpException) {
      status = exception.getStatus()
      const errorResponse = exception.getResponse()
      errorMessage = (errorResponse as HttpExceptionResponse).message || exception.message
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR
      errorMessage = 'Interno error'
      this.sentry.instance().captureException(exception)
    }

    response.status(status).send({
      error: errorMessage,
    })
  }
}
