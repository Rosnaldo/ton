import { Module } from '@nestjs/common'
import { AccessCountIncrementController } from './controller/increment.controller'
import { CountApiGetVisitsService } from './service/count-api'

@Module({
  imports: [],
  providers: [CountApiGetVisitsService],
  controllers: [AccessCountIncrementController],
  exports: [],
})
export class AccessCountModule {}
