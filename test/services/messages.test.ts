import assert from 'assert'
import app from '../../src/app'

describe('\'messages\' service', () => {
  let user: any

  before(async () => {
    const service = app.service('users')
    user = await service.create({ email: 'test@test.com', password: 'test' })
  })

  after(async () => {
    const service = app.service('users')
    user = await service.remove(user._id)
  })

  it('registered the service', () => {
    const service = app.service('messages')

    assert.ok(service, 'Registered the service')
  })

  it('populate-user hook', async () => {
    const service = app.service('messages')
    const result = await service.create({ text: 'hello' }, { user })
    assert.ok(result.user)
  })
})
