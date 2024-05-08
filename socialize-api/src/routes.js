const express = require('express')

const UsersController = require('./controllers/UsersController')
const AuthController = require('./controllers/AuthController')
const PostsController = require('./controllers/PostsController')
const CommentsController = require('./controllers/CommentsController')
const LikesController = require('./controllers/LikesController')
const FollowersController = require('./controllers/FollowersController')

const SessionMiddleware = require('./middlewares/Session')
const FeedController = require('./controllers/FeedController')

const routes = express.Router()

// Authentication
routes.post('/login', AuthController.login)
routes.post('/logout', AuthController.logout)

// Users
routes.get('/users', UsersController.index)
routes.post('/users', UsersController.store)

routes.get('/users/:user_id', UsersController.find)
routes.put(
  '/users/:user_id',
  SessionMiddleware.onlyUsers,
  UsersController.update,
)
routes.delete(
  '/users/:user_id',
  SessionMiddleware.onlyUsers,
  UsersController.delete,
)

// Posts
routes.get('/users/:user_id/posts', PostsController.index)
routes.post(
  '/users/:user_id/posts',
  SessionMiddleware.onlyUsers,
  PostsController.store,
)

routes.get('/users/:user_id/posts/:post_id', PostsController.find)
routes.put(
  '/users/:user_id/posts/:post_id',
  SessionMiddleware.onlyUsers,
  PostsController.update,
)
routes.delete(
  '/users/:user_id/posts/:post_id',
  SessionMiddleware.onlyUsers,
  PostsController.delete,
)

// Comments
routes.get('/users/:user_id/posts/:post_id/comments', CommentsController.index)
routes.post(
  '/users/:user_id/posts/:post_id/comments',
  SessionMiddleware.onlyUsers,
  CommentsController.store,
)

routes.get(
  '/users/:user_id/posts/:post_id/comments/:comment_id',
  CommentsController.find,
)
routes.put(
  '/users/:user_id/posts/:post_id/comments/:comment_id',
  SessionMiddleware.onlyUsers,
  CommentsController.update,
)
routes.delete(
  '/users/:user_id/posts/:post_id/comments/:comment_id',
  SessionMiddleware.onlyUsers,
  CommentsController.delete,
)

// Likes
routes.post(
  '/users/:user_id/posts/:post_id/likes',
  SessionMiddleware.onlyUsers,
  LikesController.store,
)
routes.delete(
  '/users/:user_id/posts/:post_id/likes',
  SessionMiddleware.onlyUsers,
  LikesController.delete,
)

// Followers
routes.post(
  '/users/:user_id/follow',
  SessionMiddleware.onlyUsers,
  FollowersController.store,
)
routes.delete(
  '/users/:user_id/follow',
  SessionMiddleware.onlyUsers,
  FollowersController.delete,
)

// Feed
routes.get('/feed', SessionMiddleware.onlyUsers, FeedController.index)

module.exports = routes
