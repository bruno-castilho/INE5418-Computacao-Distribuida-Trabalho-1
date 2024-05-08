const { Sequelize } = require('sequelize')
const Posts = require('../models/Posts')
const Likes = require('../models/Likes')
const Comments = require('../models/Comments')

module.exports = {
  async index(req, res) {
    try {
      const { user_id } = req.params

      const posts = await Posts.findAll({
        attributes: {
          include: [
            [Sequelize.literal('COUNT(likes.id)'), 'likes_count'],
            [Sequelize.literal('COUNT(comments.id)'), 'comments_count'],
          ],
        },
        include: [
          {
            model: Likes,
            as: 'likes',
            attributes: [],
          },
          {
            model: Comments,
            as: 'comments',
            attributes: [],
          },
        ],
        where: {
          user_id,
        },
        group: ['Posts.id'],
      })

      return res.status(200).json(posts)
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' })
    }
  },

  async store(req, res) {
    try {
      const { user_id } = req.params
      const { title, description } = req.body

      if (user_id != req.user.id)
        return res.status(403).json({ message: 'Access denied' })

      const post = await Posts.create({
        user_id,
        title,
        description,
      })

      return res.status(200).json(post)
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' })
    }
  },

  async find(req, res) {
    const { user_id, post_id } = req.params

    const post = await Posts.findOne({
      attributes: {
        include: [
          [Sequelize.literal('COUNT(likes.id)'), 'likes_count'],
          [Sequelize.literal('COUNT(comments.id)'), 'comments_count'],
        ],
      },
      include: [
        {
          model: Likes,
          as: 'likes',
          attributes: [],
        },
        {
          model: Comments,
          as: 'comments',
          attributes: [],
        },
      ],
      where: {
        user_id,
        id: post_id,
      },
      group: ['Posts.id'],
    })

    if (!post) return res.status(404).json({ message: 'Post not found' })

    return res.json(post)
  },

  async update(req, res) {
    try {
      const { user_id, post_id } = req.params
      const { title, description } = req.body

      if (user_id != req.user.id)
        return res.status(403).json({ message: 'Access denied' })

      const result = await Posts.update(
        {
          title,
          description,
        },
        {
          where: {
            id: post_id,
            user_id,
          },
        },
      )

      if (result == 0)
        return res.status(400).json({ message: 'Update failure' })

      return res.status(200).json({ message: 'Updated successfully' })
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' })
    }
  },

  async delete(req, res) {
    try {
      const { user_id, post_id } = req.params

      if (user_id != req.user.id)
        return res.status(403).json({ message: 'Access denied' })

      await Posts.destroy({
        where: {
          id: post_id,
          user_id,
        },
      })

      return res.status(200).json({ message: 'Deleted successfully' })
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' })
    }
  },
}
