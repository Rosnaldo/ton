import * as bcrypt from 'bcrypt'

export class CreateHash {
  async execute(string: string): Promise<string> {
    const saltRounds = 10
    return bcrypt.hash(string, saltRounds)
  }
}
