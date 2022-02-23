import { Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CountApiVisitsService } from '../service/count-api'

@ApiTags('access-count')
@Controller('access-count')
export class AccessCountHitVisitsController {
  constructor(private readonly countApiVisitsService: CountApiVisitsService) {}
  @Post('hit')
  async handle(): Promise<any> {
    return this.countApiVisitsService.hit()
  }
}
