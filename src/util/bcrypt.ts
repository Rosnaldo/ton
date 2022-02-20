import * as bcrypt from 'bcrypt'

export class CheckPassword {
  async execute(string: string, hash: string): Promise<boolean> {
    return bcrypt.compare(string, hash)
  }
}

export class CreateHash {
  async execute(string: string): Promise<string> {
    const saltRounds = 10
    return bcrypt.hash(string, saltRounds)
  }
}
