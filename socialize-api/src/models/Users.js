const { Model, DataTypes } = require('sequelize')

class Users extends Model {
  static init(sequelize) {
    super.init(
      {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
      },
      {
        sequelize,
      },
    )
  }

  static associate(models) {
    this.hasMany(models.Posts, { foreignKey: 'user_id', as: 'posts' })
    this.hasMany(models.Comments, { foreignKey: 'user_id', as: 'comments' })
    this.hasMany(models.Likes, { foreignKey: 'user_id', as: 'likes' })
    this.hasMany(models.Followers, {
      foreignKey: 'following_user_id',
      as: 'followers',
    })
    this.hasMany(models.Followers, {
      foreignKey: 'follower_user_id',
      as: 'following',
    })
  }
}

module.exports = Users
