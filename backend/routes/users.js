const router = require('express').Router();
// eslint-disable-next-line import/no-extraneous-dependencies
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUser,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/usersControllers');
const reg = require('../models/card');

router.get('/', getUsers);

router.get('/me', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUser);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateUser);
/* eslint-disable */
/* eslint-enable */
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    /* eslint-disable */
    avatar: Joi.string().required().pattern(RegExp(reg)),
    /* eslint-enable */
  }),
}), updateAvatar);

module.exports = router;
