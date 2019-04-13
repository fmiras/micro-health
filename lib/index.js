const { send } = require('micro')

module.exports = (microFn, errorChecker) => async (req, res) => {
  if (!req.url.includes('/health')) {
    return microFn(req, res)
  }

  let error
  if (errorChecker) {
    error = await errorChecker()
  }

  if (error) {
    send(res, 500, error)
  }

  return 'success'
}
