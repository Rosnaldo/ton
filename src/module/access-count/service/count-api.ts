import * as countapi from 'countapi-js'
import type { Result } from 'countapi-js'

export class CountApiVisitsService {
  async get(): Promise<Result> {
    return countapi.get('ton.com.br', 'visits')
  }

  async hit(): Promise<Result> {
    return countapi.hit('ton.com.br', 'visits')
  }
}
