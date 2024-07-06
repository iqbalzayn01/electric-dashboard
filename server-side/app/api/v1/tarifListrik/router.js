const express = require('express');
const router = express();
const { create, index, find, update, destroy } = require('./controller');
const {
  authenticateUser,
  authorizeRoles,
} = require('../../../middlewares/auth');

router.post('/create-tarif', authenticateUser, authorizeRoles('admin'), create);

router.get('/tarif', index);

router.get('/tarif/:id', find);

router.put('/tarif/:id', authenticateUser, authorizeRoles('admin'), update);

router.delete('/tarif/:id', authenticateUser, authorizeRoles('admin'), destroy);

module.exports = router;
