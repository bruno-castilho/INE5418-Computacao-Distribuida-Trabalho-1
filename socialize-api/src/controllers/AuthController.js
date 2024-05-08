require('dotenv/config');
const jwt = require('jsonwebtoken')
const Users = require('../models/Users')

const tokenExpiretion = 24 * 60 * 60 * 1000
const TOKEN_SECRET = process.env.TOKEN_SECRET

module.exports = {
  async login(req, res) {
    try {
      const { email, password } = req.body

      const user = await Users.findOne({
        where: { email },
      })

      if (!user)
        return res.status(403).json({ message: 'Invalid email or password' })

      if (user.password != password)
        return res.status(403).json({ message: 'Invalid email or password' })

      delete user.password

      const token = jwt.sign({ user }, TOKEN_SECRET, {
        expiresIn: tokenExpiretion,
      })

      res.cookie('token', token, { maxAge: tokenExpiretion, httpOnly: true })

      return res.status(200).json({
        user,
        message: 'Login successfully',
      })
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' })
    }
  },

  async logout(req, res) {
    try {
      return res
        .status(200)
        .clearCookie('token')
        .json({ message: 'Logged out' })
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' })
    }
  },
}
