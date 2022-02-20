import { Module } from '@nestjs/common'
import { AccessCountGetVisitsController } from './controller/get-visits.controller'
import { CountApiGetVisitsService } from './service/count-api'

@Module({
  imports: [],
  providers: [CountApiGetVisitsService],
  controllers: [AccessCountGetVisitsController],
  exports: [],
})
export class AccessCountModule {}
