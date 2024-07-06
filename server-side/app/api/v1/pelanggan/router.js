const express = require('express');
const router = express();
const { create, index, find, update, destroy } = require('./controller');
const {
  authenticateUser,
  authorizeRoles,
} = require('../../../middlewares/auth');

router.post(
  '/create-pelanggan',
  authenticateUser,
  authorizeRoles('admin'),
  create
);

router.get('/pelanggan', authenticateUser, authorizeRoles('admin'), index);

router.get('/pelanggan/:id', authenticateUser, authorizeRoles('admin'), find);

router.put('/pelanggan/:id', authenticateUser, authorizeRoles('admin'), update);

router.delete(
  '/pelanggan/:id',
  authenticateUser,
  authorizeRoles('admin'),
  destroy
);

module.exports = router;
