import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import compression from 'fastify-compress'
import fastifyHelmet from 'fastify-helmet'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './common/filter/http-exception.filter'

declare const module: any

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
    })
  )
  const config = app.get<ConfigService>(ConfigService)

  app.useGlobalFilters(new HttpExceptionFilter())

  app.enableCors()

  await app.register(compression)
  await app.register(fastifyHelmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`, 'cdn.jsdelivr.net', 'fonts.googleapis.com'],
        fontSrc: [`'self'`, 'fonts.gstatic.com'],
        imgSrc: [`'self'`, 'data:', 'cdn.jsdelivr.net'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`, `cdn.jsdelivr.net`],
      },
    },
  })

  app.setGlobalPrefix('v1')

  const swagger = new DocumentBuilder()
    .setTitle(process.env.npm_package_name)
    .setDescription(process.env.npm_package_description)
    .setVersion(process.env.npm_package_version)
    .build()
  const document = SwaggerModule.createDocument(app, swagger)
  SwaggerModule.setup('docs', app, document)

  const port = config.get('port')
  await app.listen(port, '0.0.0.0')

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }

  process.on('unhandledPromiseRejectionWarning', (reason, promise) => {
    console.error(reason)
    console.log(promise)
  })

  process.on('uncaughtException', (err) => {
    console.error(err)
  })
}
bootstrap()
