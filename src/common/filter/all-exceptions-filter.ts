import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common'
import { SentryService } from '@ntegral/nestjs-sentry'
import { Response } from 'express'

@Catch(Error)
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly sentry: SentryService) {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    const isHttpException = exception instanceof HttpException
    if (!isHttpException) {
      this.sentry.instance().captureException(exception)
    }

    response.status(500).send({
      error: 'Interno Error',
    })
  }
}
