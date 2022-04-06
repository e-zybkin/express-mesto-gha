const express = require('express');
const usersRoutes = require('express').Router();
const {
  createUser,
  getUsers,
  getUserById,
  updProfile,
  updAvatar,
} = require('../controllers/users');

usersRoutes.get('/', getUsers);

usersRoutes.get('/:userId', getUserById);

usersRoutes.post('/', express.json(), createUser);

usersRoutes.patch('/me', updProfile);

usersRoutes.patch('/me/avatar', updAvatar);

module.exports = usersRoutes;
