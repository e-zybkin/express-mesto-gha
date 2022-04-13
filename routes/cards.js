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

cardsRoutes.post('/', validations.makeCard, createCard);

cardsRoutes.delete('/:cardId', validations.checkCardId, delCardById);

cardsRoutes.put('/:cardId/likes', validations.checkCardId, likeCard);

cardsRoutes.delete('/:cardId/likes', validations.checkCardId, dislikeCard);

module.exports = cardsRoutes;
