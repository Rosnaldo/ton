import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CountApiVisitsService } from '../service/count-api'

@ApiTags('access-acount')
@Controller('access-acount')
export class AccessCountGetVisitsController {
  constructor(private readonly countApiVisitsService: CountApiVisitsService) {}
  @Get()
  async handle(): Promise<number> {
    const result = await this.countApiVisitsService.get()
    return result.value
  }
}