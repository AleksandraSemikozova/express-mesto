const User = require('../models/user');

const ERROR_CODE_404 = 404;
const ERROR_CODE_400 = 400;
const ERROR_CODE_500 = 500;

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      res.status(ERROR_CODE_500).send({ message: err.message });
    });
};

const getUserById = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return res
          .status(ERROR_CODE_404)
          .send({ message: 'Пользователь с таким id не найден' });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(ERROR_CODE_400)
          .send({ message: 'Передан некорректный id' });
      }
      return res.status(ERROR_CODE_500).send({ message: err.message });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res
          .status(ERROR_CODE_400)
          .send({ message: 'Переданы некорректные данные' });
      }
      return res.status(ERROR_CODE_500).send({ message: err.message });
    });
};

const updateUser = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, about: req.body.about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        return res
          .status(ERROR_CODE_404)
          .send({ message: 'Пользователь с таким id не найден' });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res
          .status(ERROR_CODE_400)
          .send({ message: 'Переданы некорректные данные' });
      }
      return res.status(ERROR_CODE_500).send({ message: err.message });
    });
};

const updateAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        return res
          .status(ERROR_CODE_404)
          .send({ message: 'Пользователь с тамим id не найден' });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res
          .status(ERROR_CODE_400)
          .send({ message: 'Переданы некорректные данные' });
      }
      return res.status(ERROR_CODE_500).send({ message: err.message });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
};
