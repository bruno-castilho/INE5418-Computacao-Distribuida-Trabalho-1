const { Model, DataTypes } = require('sequelize')

class Likes extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
      },
    )
  }

  static associate(models) {
    this.belongsTo(models.Users, { foreignKey: 'user_id', as: 'user' })
    this.belongsTo(models.Posts, { foreignKey: 'post_id', as: 'post' })
  }
}

module.exports = Likes
