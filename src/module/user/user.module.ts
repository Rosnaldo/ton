import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CreateHash } from 'src/util/bcrypt'
import { UserCreateController } from './controller/create.controller'
import { UserFindOneController } from './controller/find-one.controller'
import { UserCreateRepository } from './repository/create.repostiory'
import { UserFindOneRepository } from './repository/find-one.repostiory'
import { UserSchema } from './schema/user'

export const UserMongooseModule = MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])

@Module({
  imports: [UserMongooseModule],
  providers: [UserFindOneRepository, UserCreateRepository, CreateHash],
  controllers: [UserFindOneController, UserCreateController],
  exports: [],
})
export class UserModule {}
