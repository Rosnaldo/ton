import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from '../dto/create.dto'
import { IUser } from '../interface/user'
import { UserCreateRepository } from '../repository/create.repostiory'

@ApiTags('users')
@Controller('users')
export class UserCreateController {
  constructor(private readonly userCreateRepository: UserCreateRepository) {}

  @Post()
  @UsePipes(ValidationPipe)
  async handle(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    return this.userCreateRepository.execute(createUserDto)
  }
}
