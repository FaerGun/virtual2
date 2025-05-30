const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.get('/:id/notifications', notificationController.getUserNotifications);
router.post('/:id/notifications', notificationController.sendNotification);

module.exports = router; 