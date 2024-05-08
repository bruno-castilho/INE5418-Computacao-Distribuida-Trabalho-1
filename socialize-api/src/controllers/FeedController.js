const { Sequelize } = require('sequelize')
const Posts = require('../models/Posts')
const Likes = require('../models/Likes')
const Comments = require('../models/Comments')
const Followers = require('../models/Followers')
const Users = require('../models/Users')

module.exports = {
  async index(req, res) {
    try {
      const followedUsers = await Followers.findAll({
        where: { follower_user_id: req.user.id },
        attributes: ['following_user_id'],
      })

      const followedUserIds = followedUsers.map(
        (user) => user.following_user_id,
      )

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
        where: { user_id: followedUserIds },
        group: ['Posts.id'],
      })

      return res.status(200).json(posts)
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' })
    }
  },
}
