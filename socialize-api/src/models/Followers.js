const { Model, DataTypes } = require('sequelize')

class Followers extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
      },
    )
  }

  static associate(models) {
    this.belongsTo(models.Users, {
      foreignKey: 'follower_user_id',
      as: 'follower',
    })
    this.belongsTo(models.Users, {
      foreignKey: 'following_user_id',
      as: 'following',
    })
  }
}

module.exports = Followers
