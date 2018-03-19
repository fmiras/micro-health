const { send } = require('micro')

module.exports = (microFn, errorChecker) => (req, res) => {
  if (!req.url.includes('/health')) {
    return microFn(req, res)
  }

  let error
  if (errorChecker) {
    error = errorChecker()
  }

  if (error) {
    send(res, 500, error)
  }

  return 'success'
}
