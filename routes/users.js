const router = require('express').Router();
const {
  getUserById,
  getUsers,
  updateUser,
  updateAvatar,
  // eslint-disable-next-line no-unused-vars
  login,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
