import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateHash } from 'src/util/bcrypt'
import { CreateUserDto } from '../dto/create.dto'
import { IUser } from '../interface/user'
import { UserCreateRepository } from '../repository/create.repostiory'

@ApiTags('users')
@Controller('users')
export class UserCreateController {
  constructor(private readonly userCreateRepository: UserCreateRepository, private readonly createHash: CreateHash) {}

  @Post()
  @UsePipes(ValidationPipe)
  async handle(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    createUserDto.password = await this.createHash.execute(createUserDto.password)
    return this.userCreateRepository.execute(createUserDto)
  }
}
