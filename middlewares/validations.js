const {
  celebrate,
  Joi,
  Segments,
} = require('celebrate');
const validator = require('validator');

const regAndUpd = celebrate({
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

const makeCard = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi
      .string()
      .required()
      .min(2)
      .max(30)
      .messages({
        'any.required': 'Имя карточки не указано',
        'string.min': 'Имя карточки должно быть не короче 2 символов',
        'string.max': 'Имя карточки должно быть не длиннее 30 символов',
      }),
    link: Joi.string().required().custom((value, helper) => {
      if (!validator.isURL(value)) {
        return helper.error('string.notURL');
      }

      return value;
    }).messages({
      'any.required': 'Ссылка на картинку не указана',
      'string.notURL': 'Ссылка некорректна',
    }),
  }).unknown(true),
});

const checkUserId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string().length(24).messages({
      'string.length': 'Неверно введён ID',
    }),
  }),
});

const checkCardId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().length(24).messages({
      'string.length': 'Неверно введён ID',
    }),
  }),
});

module.exports = {
  regAndUpd,
  makeCard,
  checkUserId,
  checkCardId,
};
