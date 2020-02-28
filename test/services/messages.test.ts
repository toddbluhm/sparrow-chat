import assert from 'assert'
import app from '../../src/app'

describe('\'messages\' service', () => {
  it('registered the service', () => {
    const service = app.service('messages')

    assert.ok(service, 'Registered the service')
  })

  it('creates and processes message, adds user information', async () => {
    // Create a new user we can use for testing
    const user = await app.service('users').create({
      email: 'messagetest@example.com',
      password: 'supersecret'
    })

    // The messages service call params (with the user we just created)
    const params = { user }
    const message = await app.service('messages').create({
      text: 'a test',
      additional: 'should be removed'
    }, params)

    assert.equal(message.text, 'a test')
    // `userId` should be set to passed users it
    assert.equal(message.userId, user.id)
    // Additional property has been removed
    assert.ok(message.additional == null)
    // `user` has been populated
    assert.deepEqual(message.user, user)
  })
})
