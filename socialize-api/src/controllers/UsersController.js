const { Sequelize } = require('sequelize')
const Users = require('../models/Users')
const Followers = require('../models/Followers')

module.exports = {
  async index(req, res) {
    try {
      const users = await Users.findAll({
        attributes: {
          exclude: ['password'],
          include: [
            [Sequelize.literal('COUNT(followers.id)'), 'followers_count'],
          ],
        },
        include: [
          {
            model: Followers,
            as: 'followers',
            attributes: [],
          },
        ],
        group: ['Users.id'],
      })

      return res.status(200).json(users)
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' })
    }
  },

  async store(req, res) {
    try {
      const { first_name, last_name, email, password } = req.body

      const user = await Users.create({
        first_name,
        last_name,
        email,
        password,
      })

      return res.status(200).json(user)
    } catch (error) {
      if (error.name == 'SequelizeUniqueConstraintError')
        return res.status(400).json({ error: 'Email must be unique' })

      return res.status(500).json({ message: 'Internal server error' })
    }
  },

  async find(req, res) {
    try {
      const { user_id } = req.params

      const user = await Users.findOne({
        attributes: {
          exclude: ['password'],
          include: [
            [Sequelize.literal('COUNT(followers.id)'), 'followers_count'],
          ],
        },
        include: [
          {
            model: Followers,
            as: 'followers',
            attributes: [],
          },
        ],
        where: {
          id: user_id,
        },
        group: ['Users.id'],
      })

      if (!user) return res.status(404).json({ message: 'User not found' })

      return res.status(200).json(user)
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' })
    }
  },

  async update(req, res) {
    try {
      const { user_id } = req.params
      const { first_name, last_name, email, password } = req.body

      if (user_id != req.user.id)
        return res.status(403).json({ message: 'Access denied' })

      const result = await Users.update(
        { first_name, last_name, email, password },
        {
          where: {
            id: user_id,
          },
        },
      )

      if (result == 0)
        return res.status(400).json({ message: 'Update failure' })

      return res.status(200).json({ message: 'Updated successfully' })
    } catch (error) {
      if (error.name == 'SequelizeUniqueConstraintError')
        return res.status(400).json({ error: 'Email must be unique' })
      return res.status(500).json({ message: 'Internal server error' })
    }
  },

  async delete(req, res) {
    try {
      const { user_id } = req.params

      if (user_id != req.user.id)
        return res.status(403).json({ message: 'Access denied' })

      await Users.destroy({
        where: {
          id: user_id,
        },
      })

      return res
        .status(200)
        .clearCookie('token')
        .json({ message: 'Deleted successfully' })
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' })
    }
  },
}
