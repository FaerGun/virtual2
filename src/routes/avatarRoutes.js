const express = require('express');
const router = express.Router();
const avatarController = require('../controllers/avatarController');

router.post('/:id/avatar', avatarController.uploadAvatar);
router.delete('/:id/avatar', avatarController.deleteAvatar);

module.exports = router; 