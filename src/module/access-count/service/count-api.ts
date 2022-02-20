import * as countapi from 'countapi-js'
import type { Result } from 'countapi-js'

export class CountApiGetVisitsService {
  async execute(): Promise<Result> {
    return countapi.visits('ton.com.br')
  }
}
