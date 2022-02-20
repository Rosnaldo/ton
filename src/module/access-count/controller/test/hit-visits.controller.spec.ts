import { Test, TestingModule } from '@nestjs/testing'
import { Logger } from '@nestjs/common'
import { CountApiVisitsService } from '../../service/count-api'
import { AccessCountHitVisitsController } from '../hit-visits.controller'

let controller
const mockCountApiVisitsService = {
  hit: jest.fn(),
}

const Sut = () => {
  const spy = jest.spyOn(mockCountApiVisitsService, 'hit')
  return { spy }
}

describe('AccessCountHitVisitsController', () => {
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccessCountHitVisitsController],
      providers: [CountApiVisitsService],
    })
      .setLogger(new Logger())
      .overrideProvider(CountApiVisitsService)
      .useValue(mockCountApiVisitsService)
      .compile()

    controller = module.get<AccessCountHitVisitsController>(AccessCountHitVisitsController)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('Controller should be defined', function () {
    expect(controller).toBeDefined()
  })

  it('Should call CountApiVisitsService.hit to be called', async function () {
    const { spy } = Sut()

    await controller.handle()
    expect(spy).toBeCalled()
  })
})
