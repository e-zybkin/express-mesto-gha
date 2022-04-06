const express = require('express');
const cardsRoutes = require('express').Router();
const {
  createCard,
  getCards,
  delCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardsRoutes.get('/', getCards);

cardsRoutes.post('/', express.json(), createCard);

cardsRoutes.delete('/:cardId', delCardById);

cardsRoutes.put('/:cardId/likes', likeCard);

cardsRoutes.delete('/:cardId/likes', dislikeCard);

module.exports = cardsRoutes;
