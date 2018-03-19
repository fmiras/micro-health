const test = require('ava')
const sinon = require('sinon')
const rewire = require('rewire')

const health = rewire('../lib')

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

test('With custom checker if !error then success', t => {
  const microFn = () => 'Micro Response'
  const errorChecker = sinon.stub()
  errorChecker.callsFake(() => false)
  const handler = health(microFn, errorChecker)

  const req = { url: '/health' }
  handler(req)
  t.true(errorChecker.calledOnce)
})

test('With custom checker if !error send 500', t => {
  const microFn = () => 'Micro Respo  nse'
  health.__set__('send', sinon.stub().callsFake(() => {
    throw new Error('Error!')
  }))
  const errorChecker = sinon.stub().returns({ error: 'big error' })
  const handler = health(microFn, errorChecker)

  const req = { url: '/health' }
  t.throws(() => handler(req))
})

test('With custom checker that isn\'t a function', t => {
  const microFn = () => 'Micro Respo  nse'
  health.__set__('send', sinon.stub().callsFake(() => {
    throw new Error('Error!')
  }))
  const errorChecker = { foo: 'bar' }
  const handler = health(microFn, errorChecker)

  const req = { url: '/health' }
  t.throws(() => handler(req))
})
