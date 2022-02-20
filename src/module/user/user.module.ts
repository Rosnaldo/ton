import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserCreateController } from './controller/create'
import { UserFindOneController } from './controller/find-one'
import { UserCreateRepository } from './repository/create.repostiory'
import { UserFindOneRepository } from './repository/find-one.repostiory'
import { UserSchema } from './schema/user'

export const UserMongooseModule = MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])

@Module({
  imports: [UserMongooseModule],
  providers: [UserFindOneRepository, UserCreateRepository],
  controllers: [UserFindOneController, UserCreateController],
  exports: [],
})
export class UserModule {}
