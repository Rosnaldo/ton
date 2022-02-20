import { Test, TestingModule } from '@nestjs/testing'
import { Logger } from '@nestjs/common'
import { UserCreateController } from '../create.controller'
import { UserCreateRepository } from '../../repository/create.repostiory'
import { MakeMockUser } from '../../mock/user'
import { CreateHash } from 'src/util/bcrypt'

let controller
const mockUserCreateRepository = {
  execute: jest.fn(),
}
const mockCreateHash = {
  execute: jest.fn(),
}

const Sut = () => {
  const spy = jest.spyOn(mockUserCreateRepository, 'execute')
  jest.spyOn(mockCreateHash, 'execute').mockResolvedValueOnce('encrypted')
  return { spy }
}

describe('UserCreateController', () => {
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserCreateController],
      providers: [UserCreateRepository, CreateHash],
    })
      .setLogger(new Logger())
      .overrideProvider(UserCreateRepository)
      .useValue(mockUserCreateRepository)
      .overrideProvider(CreateHash)
      .useValue(mockCreateHash)
      .compile()

    controller = module.get<UserCreateController>(UserCreateController)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('Controller should be defined', function () {
    expect(controller).toBeDefined()
  })

  it('Should call UserCreateRepository with right param', async function () {
    const mockUser = MakeMockUser()
    const expeted = { ...mockUser, password: 'encrypted' }
    const { spy } = Sut()

    await controller.handle(mockUser)
    expect(spy).toBeCalledWith(expeted)
  })
})
