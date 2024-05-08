const { Model, DataTypes } = require('sequelize')

class Posts extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
      },
      {
        sequelize,
      },
    )
  }

  static associate(models) {
    this.belongsTo(models.Users, { foreignKey: 'user_id', as: 'user' })
    this.hasMany(models.Comments, { foreignKey: 'post_id', as: 'comments' })
    this.hasMany(models.Likes, { foreignKey: 'post_id', as: 'likes' })
  }
}

module.exports = Posts
