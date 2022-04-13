const {
  celebrate,
  Joi,
  Segments,
} = require('celebrate');
const validator = require('validator');

const register = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().custom((value, helper) => {
      if (!validator.isEmail(value)) {
        return helper.error('string.notEmail');
      }

      return value;
    }).messages({
      'any.required': 'Email не указан',
      'string.notEmail': 'Email некорректен',
    }),
    password: Joi.string().required().min(8).messages({
      'any.required': 'Пароль не указан',
      'string.min': 'Пароль должен быть не короче 8 символов',
    }),
  }).unknown(true),
});

module.exports = {
  register,
};
