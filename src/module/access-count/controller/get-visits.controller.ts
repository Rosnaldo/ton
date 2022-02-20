import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CountApiGetVisitsService } from '../service/count-api'

@ApiTags('access-acount')
@Controller('access-acount')
export class AccessCountGetVisitsController {
  constructor(private readonly countApiGetVisitsService: CountApiGetVisitsService) {}
  @Get()
  async handle(): Promise<number> {
    const result = await this.countApiGetVisitsService.execute()
    return result.value
  }
}
