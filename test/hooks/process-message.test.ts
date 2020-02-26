import assert from 'assert'
import app from '../../src/app'
import processMessageHook from '../../src/hooks/process-message'

describe('\'process-message\' hook', () => {
  let user: any

  before(async () => {
    const service = app.service('users')
    user = await service.create({ email: 'test@test.com', password: 'test' })
  })

  after(async () => {
    const service = app.service('users')
    user = await service.remove(user._id)
  })

  it('should clean message text', async () => {
    const hook = processMessageHook()
    const res = await hook({
      id: '',
      data: {
        text: ' fdsklf dsjfkdsjdfjkldsjklf dsklfj kdsjfkljdsklf jkldsj fkldjskl' +
          ' fjadklsjs fkldsajkl fjdsklj fkldsjkl fjdsklf jkldsjfkl djsklfjdskf ' +
          'kdsjf klsdjklf jsdkjf kldsjkl fjdskl fjklds j fkl dsklfjdskljf lkads' +
          ' fjadklsjs fkldsajkl fjdsklj fkldsjkl fjdsklf jkldsjfkl djsklfjdskf ' +
          'kdsjf klsdjklf jsdkjf kldsjkl fjdskl fjklds j fkl dsklfjdskljf lkads' +
          'kdsjf klsdjklf jsdkjf kldsjkl fjdskl fjklds j fkl dsklfjdskljf lkads' +
          'jkl fjdsklfj klsdf klads',
        extraItem: 'hello world!'
      },
      app,
      method: 'get',
      type: 'after',
      params: { user: {} },
      path: '',
      service: {} as any
    })
    assert.ok(res.data.text)
    assert.ok(res.data.text.length <= 400)
    assert(!('extraItem' in res.data))
  })
})
