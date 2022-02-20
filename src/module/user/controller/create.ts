import { Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { IUser } from '../interface/user'
import { UserCreateRepository } from '../repository/create.repostiory'
// import { UserFindOneRepository } from '../repository/find-one.repostiory'

@ApiTags('users')
@Controller('users')
export class UserCreateController {
  constructor(private readonly userCreateRepository: UserCreateRepository) {}

  @Post()
  async handle(): Promise<IUser> {
    return this.userCreateRepository.execute({ name: 'Dodo' })
  }
}
