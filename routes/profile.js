const createError = require('http-errors');
const { check, validationResult } = require('express-validator/check');
const express = require('express');
const router = express.Router();
const models = require('../models');

const validationRules = [
  check('username').isString().isLength({min: 5}),
  check('password').isString().isLength({min: 5}),
  check('email').isEmail(),
  check('name').isString().isLength({min: 5}),
  check('address').isString(),
  check('mobile').isString().isLength({min: 8}),
  check('gender').isString().isLength({min: 4, max: 6})
];

router.post('/', [validationRules], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).send({errors: errors.array()});
  }

  // attach user's ip address
  req.body.last_login_ip = req.connection.remoteAddress;

  models.user.create(req.body)
    .then(user => {
      user = user.get({plain: true});
      models.account.create({
        ...req.body,
        user_id: user.id
      })
        .then(account => {
          account = account.get({plain: true});
          res.status(201).send(Object.assign({}, user, account));
        })
        .catch(err => res.status(400).send(err));
    })
    .catch(err => res.status(400).send(err));
});

router.get('/:id', (req, res, next) => {
  models.account.findByPk(req.params.id, {include: [{all: true, nested: true}]})
    .then(account => {
      if (!account) {
        res.status(404).send(createError(404));
      }
      res.status(200).send(account);
    })
    .catch(() => res.status(404).send(createError(404)))
});

module.exports = router;
