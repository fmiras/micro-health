module.exports = microFn => (req, res) => {
  if (req.url.includes('/health')) {
    return 'success'
  }

  return microFn(req, res)
}
