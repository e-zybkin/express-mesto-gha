const bcrypt = require('bcryptjs/dist/bcrypt');
const mongoose = require('mongoose');
const { isEmail, isURL } = require('validator');
const ErrorUnAuthorized = require('../errors/ErrorUnautharized');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив-Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: [isURL, 'Некорректная ссылка на картинку'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, 'Некорректный email'],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new ErrorUnAuthorized('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new ErrorUnAuthorized('Неправильные почта или пароль'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
