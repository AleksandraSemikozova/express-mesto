const Card = require('../models/card');

const ERROR_CODE_404 = 404;
const ERROR_CODE_400 = 400;
const ERROR_CODE_500 = 500;

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(ERROR_CODE_500).send({ message: err.message }));
};

const postCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(ERROR_CODE_400)
          .send({ message: 'Переданы некорректные данные' });
      }
      return res.status(ERROR_CODE_500).send({ message: err.message });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res
          .status(ERROR_CODE_404)
          .send({ message: 'Картинка с указанным id не найдена' });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(ERROR_CODE_400)
          .send({ message: 'Переданы некорректные данные' });
      }
      return res.status(ERROR_CODE_500).send({ message: err.message });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res
          .status(ERROR_CODE_404)
          .send({ message: 'Картинка с указанным id не найдена' });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(ERROR_CODE_400)
          .send({ message: 'Переданы некорректные данные' });
      }
      return res.status(ERROR_CODE_500).send({ message: err.message });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res
          .status(ERROR_CODE_404)
          .send({ message: 'Картинка с указанным id не найдена' });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(ERROR_CODE_400)
          .send({ message: 'Переданы некорректные данные' });
      }
      return res.status(ERROR_CODE_500).send({ message: err.message });
    });
};

module.exports = {
  getCards,
  postCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
