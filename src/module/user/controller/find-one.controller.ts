import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { isNil as _isNil } from 'lodash'
import { IUser } from '../interface/user'
import { UserFindOneRepository } from '../repository/find-one.repostiory'

@ApiTags('users')
@Controller('users')
export class UserFindOneController {
  constructor(private readonly userFindOneRepository: UserFindOneRepository) {}

  @Get(':userId')
  async handle(@Param('userId') userId: string): Promise<IUser> {
    const user = await this.userFindOneRepository.execute({ _id: userId })

    if (_isNil(user)) {
      throw new BadRequestException('User not found')
    }

    return user
  }
}
