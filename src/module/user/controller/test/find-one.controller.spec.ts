import { Test, TestingModule } from '@nestjs/testing'
import { Logger } from '@nestjs/common'
import { UserFindOneController } from '../find-one.controller'
import { UserFindOneRepository } from '../../repository/find-one.repostiory'

let controller
const mockUserFindOneRepository = {
  execute: jest.fn(),
}

const Sut = () => {
  const spy = jest.spyOn(mockUserFindOneRepository, 'execute')
  return { spy }
}

describe('UserFindOneController', () => {
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserFindOneController],
      providers: [UserFindOneRepository],
    })
      .setLogger(new Logger())
      .overrideProvider(UserFindOneRepository)
      .useValue(mockUserFindOneRepository)
      .compile()

    controller = module.get<UserFindOneController>(UserFindOneController)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('Controller should be defined', function () {
    expect(controller).toBeDefined()
  })

  it('Should call UserFindOneRepository with right param', async function () {
    const { spy } = Sut()
    const userId = '5ce1d6bb8fef73750f97e941'
    await controller.handle(userId)
    expect(spy).toBeCalledWith({ _id: userId })
  })
})
