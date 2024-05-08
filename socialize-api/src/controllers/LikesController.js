const Posts = require('../models/Posts')
const Likes = require('../models/Likes')

module.exports = {
  async store(req, res) {
    try {
      const { user_id, post_id } = req.params

      const post = await Posts.findOne({
        where: {
          id: post_id,
          user_id,
        },
      })

      if (!post) return res.status(404).json({ message: 'Post not found' })

      const like = await Likes.findOne({
        where: { post_id, user_id: req.user.id },
      })

      if (like) return res.status(404).json({ message: 'You already liked' })

      await Likes.create({ post_id, user_id: req.user.id })

      return res.status(200).json({ message: 'Liked' })
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error })
    }
  },
  async delete(req, res) {
    try {
      const { user_id, post_id } = req.params

      const post = await Posts.findOne({
        where: {
          id: post_id,
          user_id,
        },
      })

      if (!post) return res.status(404).json({ message: 'Post not found' })

      const like = await Likes.findOne({
        where: { post_id, user_id: req.user.id },
      })

      if (!like) return res.status(404).json({ message: 'You already liked' })

      await Likes.destroy({ where: { post_id, user_id: req.user.id } })

      return res.status(200).json({ message: 'Unliked' })
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error })
    }
  },
}
