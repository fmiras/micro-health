const { send } = require('micro')

module.exports = async (microFn, errorChecker) => (req, res) => {
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
