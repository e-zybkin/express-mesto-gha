const cardsRoutes = require('express').Router();
const {
  createCard,
  getCards,
  delCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const validations = require('../middlewares/validations');

cardsRoutes.get('/', getCards);

cardsRoutes.post('/', createCard);

cardsRoutes.delete('/:cardId', delCardById);

cardsRoutes.put('/:cardId/likes', likeCard);

cardsRoutes.delete('/:cardId/likes', dislikeCard);

module.exports = cardsRoutes;
