import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { Test } from '@nestjs/testing'
import { MongooseModule } from '@nestjs/mongoose'
import { LoadSeed } from 'src/util/load-seed'
import { UserFindOneController } from 'src/module/user/controller/find-one.controller'
import { UserMongooseModule } from 'src/module/user/user.module'
import { UserFindOneRepository } from 'src/module/user/repository/find-one.repostiory'

let app: NestFastifyApplication
let replSet: any

describe('UserFindOneController', () => {
  beforeAll(async () => {
    const { uri, replSet2 } = await LoadSeed()
    replSet = replSet2
    const moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          useFactory: async () => ({
            uri,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
          }),
        }),
        UserMongooseModule,
      ],
      controllers: [UserFindOneController],
      providers: [UserFindOneRepository],
    }).compile()
    app = moduleRef.createNestApplication<NestFastifyApplication>(new FastifyAdapter())

    await app.init()
    await app.getHttpAdapter().getInstance().ready()
  })

  afterAll(async () => {
    await app.close()
    await replSet.stop()
  })

  it(`/GET user`, () => {
    return app
      .inject({
        method: 'GET',
        url: '/users/5ce5895fc312a6648e06d5f3',
      })
      .then((result) => {
        expect(result.statusCode).toEqual(200)
        expect(result.payload).toMatchSnapshot()
      })
  })
})
