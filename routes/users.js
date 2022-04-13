const usersRoutes = require('express').Router();
const {
  getUsers,
  getUserById,
  getUserInfo,
  updProfile,
  updAvatar,
} = require('../controllers/users');
const validations = require('../middlewares/validations');

usersRoutes.get('/', getUsers);

usersRoutes.get('/me', getUserInfo);

usersRoutes.get('/:userId', validations.checkUserId, getUserById);

usersRoutes.patch('/me', validations.updateProf, updProfile);

usersRoutes.patch('/me/avatar', validations.updateAva, updAvatar);

module.exports = usersRoutes;
