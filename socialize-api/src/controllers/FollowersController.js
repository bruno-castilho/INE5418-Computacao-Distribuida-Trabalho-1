const Users = require('../models/Users')
const Followers = require('../models/Followers')

module.exports = {
  async store(req, res) {
    try {
      const { user_id } = req.params

      if (user_id == req.user.id)
        return res.status(403).json({ message: "You can't follow yourself" })

      if (!(await Users.findByPk(user_id)))
        return res.status(404).json({ message: 'User not found' })

      const alreadyFollowed = await Followers.findOne({
        where: { follower_user_id: req.user.id, following_user_id: user_id },
      })

      if (alreadyFollowed)
        return res.status(404).json({ message: 'You already followed' })

      await Followers.create({
        follower_user_id: req.user.id,
        following_user_id: user_id,
      })

      return res.status(200).json({ message: 'Followed' }) // Fazer get, put, delete para um usuario.
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error })
    }
  },
  async delete(req, res) {
    try {
      const { user_id } = req.params

      const alreadyFollowed = await Followers.findOne({
        where: { follower_user_id: req.user.id, following_user_id: user_id },
      })

      if (!alreadyFollowed)
        return res.status(404).json({ message: "You didn't already follow" })

      await Followers.destroy({
        where: { follower_user_id: req.user.id, following_user_id: user_id },
      })

      return res.status(200).json({ message: 'Unliked' })
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error })
    }
  },
}
