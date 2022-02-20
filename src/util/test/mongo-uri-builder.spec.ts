import mongoUriBuilder from '../mongoUriBuilder'

describe('mongoUriBuilder', () => {
  it('Should call mongoUriBuilder return right url', function () {
    const param = { db: 'ton', host: 'localhost' }
    const url = mongoUriBuilder(param)
    expect(url).toBe('mongodb://localhost/ton')
  })
})
