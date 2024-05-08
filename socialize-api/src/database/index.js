const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

const Users = require('../models/Users')
const Posts = require('../models/Posts')
const Comments = require('../models/Comments')
const Likes = require('../models/Likes')
const Followers = require('../models/Followers')

const connection = new Sequelize(dbConfig)

Users.init(connection)
Posts.init(connection)
Comments.init(connection)
Likes.init(connection)
Followers.init(connection)

Users.associate(connection.models)
Posts.associate(connection.models)
Comments.associate(connection.models)
Likes.associate(connection.models)
Followers.associate(connection.models)

module.exports = connection
