const test = require('ava')
const health = require('../lib')

test('Return success on health check', t => {
  const microFn = () => 'Micro Response'
  const handler = health(microFn)

  const req = { url: '/health' }
  t.is('success', handler(req))
})

test('Execute microservice if isn\'t health check', t => {
  const microFn = () => 'Micro Response'
  const handler = health(microFn)

  const req = { url: '/' }
  t.is('Micro Response', handler(req))
})
