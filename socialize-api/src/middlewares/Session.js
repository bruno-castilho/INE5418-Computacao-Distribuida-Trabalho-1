const jwt = require('jsonwebtoken')

const TOKEN_SECRET = 'fdadasdasdasd'

module.exports = {
  onlyUsers(req, res, next) {
    try {
      const token = req.cookies.token

      if (!token)
        return res.status(401).send('Authentication token is required.')
      const { user } = jwt.verify(token, TOKEN_SECRET)

      req.user = user

      next()
    } catch {
      if (error.message == 'invalid signature') {
        return res
          .clearCookie('token')
          .status(401)
          .json({ error: 'Invalid Token' })
      }
      return res.json({ error: 'Internal server error' })
    }
  },
}
