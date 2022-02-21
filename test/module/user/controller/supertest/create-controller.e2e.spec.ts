import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { Test } from '@nestjs/testing'
import { MongooseModule } from '@nestjs/mongoose'
import * as timekeeper from 'timekeeper'
import { LoadSeed } from 'test/util/load-seed'
import { UserMongooseModule } from 'src/module/user/user.module'
import { UserCreateController } from 'src/module/user/controller/create.controller'
import { UserCreateRepository } from 'src/module/user/repository/create.repostiory'
import { MakeMockUser } from 'test/module/user/mock/user'
import { CreateHash } from 'src/util/bcrypt'

let app: NestFastifyApplication
let replSet: any

const mockCreateHash = {
  execute: jest.fn(),
}

const Sut = () => {
  jest.spyOn(mockCreateHash, 'execute').mockResolvedValueOnce('encrypted')
}

describe('UserCreateController', () => {
  beforeAll(async () => {
    timekeeper.freeze(new Date('2021-10-13T19:21:44.908Z'))
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
      controllers: [UserCreateController],
      providers: [UserCreateRepository, CreateHash],
    })
      .overrideProvider(CreateHash)
      .useValue(mockCreateHash)
      .compile()
    app = moduleRef.createNestApplication<NestFastifyApplication>(new FastifyAdapter())

    await app.init()
    await app.getHttpAdapter().getInstance().ready()
  })

  afterAll(async () => {
    timekeeper.reset()
    await app.close()
    await replSet.stop()
  })

  it(`/POST user`, () => {
    Sut()
    return app
      .inject({
        method: 'POST',
        url: '/users',
        payload: MakeMockUser(),
      })
      .then((result) => {
        expect(result.statusCode).toEqual(201)
        expect(result.payload).toMatchSnapshot()
      })
  })
})
