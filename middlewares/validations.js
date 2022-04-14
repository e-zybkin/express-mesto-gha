const {
  celebrate,
  Joi,
  Segments,
} = require('celebrate');
const validator = require('validator');

const reg = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name:
      Joi
        .string()
        .min(2)
        .max(30)
        .messages({
          'string.min': 'Имя должно быть не короче 2 символов',
          'string.max': 'Имя должно быть не длиннее 30 символов',
        }),
    about:
      Joi
        .string()
        .min(2)
        .max(30)
        .messages({
          'string.min': 'Поле должно содержать хотя бы 2 символа',
          'string.max': 'Поле не должно быть заполнено более чем на 30 символов',
        }),
    avatar: Joi.string().regex(/http(s)?:\/\/\S+[^\s]\.\S+/),
    email: Joi.string().required().custom((value, helper) => {
      if (!validator.isEmail(value)) {
        return helper.error('string.notEmail');
      }

      return value;
    }).messages({
      'any.required': 'Email не указан',
      'string.notEmail': 'Email некорректен',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Пароль не указан',
    }),
  }),
});

const log = celebrate({
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
    password: Joi.string().required().messages({
      'any.required': 'Пароль не указан',
    }),
  }),
});

const updateProf = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name:
      Joi
        .string()
        .required()
        .min(2)
        .max(30)
        .messages({
          'any.required': 'Имя не указано',
          'string.min': 'Имя должно быть не короче 2 символов',
          'string.max': 'Имя должно быть не длиннее 30 символов',
        }),
    about:
      Joi
        .string()
        .required()
        .min(2)
        .max(30)
        .messages({
          'any.required': 'Вы ничего не написали о себе',
          'string.min': 'Поле должно содержать хотя бы 2 символа',
          'string.max': 'Поле не должно быть заполнено более чем на 30 символов',
        }),
  }),
});

const updateAva = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().required().regex(/http(s)?:\/\/\S+[^\s]\.\S+/),
  }),
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
  }),
});

const checkUserId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string().length(24).hex().messages({
      'string.length': 'Неверно введён ID',
    }),
  }),
});

const checkCardId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().length(24).hex().messages({
      'string.length': 'Неверно введён ID',
    }),
  }),
});

module.exports = {
  reg,
  log,
  makeCard,
  checkUserId,
  checkCardId,
  updateProf,
  updateAva,
};
