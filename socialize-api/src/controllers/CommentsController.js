const Comments = require('../models/Comments')
const Posts = require('../models/Posts')
const Users = require('../models/Users')

module.exports = {
  async index(req, res) {
    try {
      const { user_id, post_id } = req.params

      const comments = await Comments.findAll({
        include: [
          {
            model: Users,
            as: 'user',
            attributes: ['first_name', 'last_name'],
          },
          {
            model: Posts,
            as: 'post',
            attributes: [],
            where: {
              id: post_id,
              user_id,
            },
          },
        ],
      })

      return res.json(comments)
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error })
    }
  },

  async store(req, res) {
    try {
      const { user_id, post_id } = req.params
      const { text } = req.body

      const post = await Posts.findOne({
        where: {
          id: post_id,
          user_id,
        },
      })

      if (!post) return res.status(404).json({ message: 'Post not found' })

      const comment = await Comments.create({
        user_id: req.user.id,
        post_id,
        text,
      })

      return res.status(200).json(comment)
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' })
    }
  },

  async find(req, res) {
    const { user_id, post_id, comment_id } = req.params

    const comment = await Comments.findOne({
      include: [
        {
          model: Users,
          as: 'user',
          attributes: ['first_name', 'last_name'],
        },
        {
          model: Posts,
          as: 'post',
          attributes: [],
          where: {
            id: post_id,
            user_id,
          },
        },
      ],
      where: {
        id: comment_id,
      },
    })

    return res.json(comment)
  },

  async update(req, res) {
    try {
      const { user_id, post_id, comment_id } = req.params
      const { text } = req.body

      const comment = await Comments.findByPk(comment_id)

      if (!comment)
        return res.status(404).json({ message: 'Comment not found' })

      if (comment.user_id !== req.user.id)
        return res.status(403).json({ message: 'Access denied' })

      const result = await Comments.update(
        {
          text,
        },
        {
          where: {
            id: comment_id,
            post_id,
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
      const { user_id, post_id, comment_id } = req.params

      const comment = await Comments.findByPk(comment_id)

      if (!comment)
        return res.status(404).json({ message: 'Comment not found' })

      if (user_id != req.user.id && comment.user_id != req.user.id)
        return res.status(403).json({ message: 'Access denied' })

      await Comments.destroy({
        where: {
          id: comment_id,
          post_id,
        },
      })

      return res.status(200).json({ message: 'Deleted successfully' })
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' })
    }
  },
}
