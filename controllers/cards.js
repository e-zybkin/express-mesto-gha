const Card = require('../models/card');
const ErrorNotFound = require('../errors/ErrorNotFound');
const ErrorForbidden = require('../errors/ErrorForbidden');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      next(err);

      /*if (err.name === 'ValidationError') {
        let errorMessage = 'В следующих полях введены неверные данные: ';
        const errorValues = Object.values(err.errors);
        errorValues.forEach((errVal) => {
          if (typeof errVal === 'object') {
            errorMessage += `${errVal.path}, `;
          }
        });
        res.status(400).send({ message: errorMessage });
      }*/
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
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new ErrorNotFound('Карточки с таким ID не существует');
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new ErrorForbidden('Вы не можете удалять чужие карточки');
      }
      Card.findByIdAndRemove(req.params.cardId)
        .then((card) => res.send({ data: card }))
        .catch((err) => {
          next(err);

          /*if (err.name === 'CastError') {
            res.status(400).send({ message: 'Неверно введён ID' });
          }*/
        });
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new ErrorNotFound('Карточки с таким ID не существует');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      next(err);

      /*if (err.name === 'CastError') {
        res.status(400).send({ message: 'Неверно введён ID' });
      }*/
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new ErrorNotFound('Карточки с таким ID не существует');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      next(err);

      /*if (err.name === 'CastError') {
        res.status(400).send({ message: 'Неверно введён ID' });
      }*/
    });
};
