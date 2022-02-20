import { Controller, Get, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { IUser } from '../interface/user'
import { UserFindOneRepository } from '../repository/find-one.repostiory'

@ApiTags('users')
@Controller('users')
export class UserFindOneController {
  constructor(private readonly userFindOneRepository: UserFindOneRepository) {}

  @Get(':userId')
  async handle(@Param('userId') userId: string): Promise<IUser> {
    return this.userFindOneRepository.execute({ _id: userId })
  }
}
