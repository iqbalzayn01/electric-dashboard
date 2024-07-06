const express = require('express');
const router = express();
const { create, index, find, update, destroy } = require('./controller');
const {
  authenticateUser,
  authorizeRoles,
} = require('../../../middlewares/auth');

router.post('/sign-up', create);

router.get('/users', authenticateUser, authorizeRoles('admin'), index);

router.get(
  '/users/:id',
  authenticateUser,
  authorizeRoles('pelanggan', 'admin'),
  find
);

router.put(
  '/users/:id',
  authenticateUser,
  authorizeRoles('pelanggan', 'admin'),
  update
);

router.delete('/users/:id', authenticateUser, authorizeRoles('admin'), destroy);

module.exports = router;
