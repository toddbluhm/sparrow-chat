import assert from 'assert'
import app from '../../src/app'
import populateUserHook from '../../src/hooks/populate-user'

describe('\'populate-user\' hook', () => {
  let user: any

  before(async () => {
    const service = app.service('users')
    user = await service.create({ email: 'test@test.com', password: 'test' })
  })

  after(async () => {
    const service = app.service('users')
    user = await service.remove(user._id)
  })

  it('should populate the \'user\' field', async () => {
    const hook = populateUserHook()
    const res = await hook({
      id: '',
      result: { userId: user._id },
      app,
      method: 'get',
      type: 'after',
      params: {},
      path: '',
      service: {} as any
    })
    assert.ok(res.result.user)
    assert.ok(res.result.user._id === user._id)
  })
})
