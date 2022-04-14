const Card = require('../models/card');
const ErrorNotFound = require('../errors/ErrorNotFound');
const ErrorForbidden = require('../errors/ErrorForbidden');
const ErrorValidation = require('../errors/ErrorValidation');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorValidation('Переданы невалидные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      next(err);
    });
};

module.exports.delCardById = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(() => {
      throw new ErrorNotFound('Карточки с таким ID не существует');
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new ErrorForbidden('Вы не можете удалять чужие карточки');
      }
      return Card.findByIdAndRemove(cardId)
        .then(() => res.send({ data: card }));
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new ErrorNotFound('Карточки с таким ID не существует');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new ErrorNotFound('Карточки с таким ID не существует');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      next(err);
    });
};
