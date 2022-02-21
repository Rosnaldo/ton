import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from 'src/module/user/dto/create.dto'
import { IUser } from 'src/module/user/interface/user'
import { UserCreateUseCase } from 'src/module/user/use-case/create.use-case'

@ApiTags('users')
@Controller('users')
export class UserCreateController {
  constructor(private readonly userCreateUseCase: UserCreateUseCase) {}

  @Post()
  @UsePipes(ValidationPipe)
  async handle(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    return this.userCreateUseCase.execute(createUserDto)
  }
}
