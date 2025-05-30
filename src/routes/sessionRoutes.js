const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');

router.get('/:id/sessions', sessionController.getUserSessions);
router.delete('/:id/sessions/:sessionId', sessionController.deleteUserSession);

module.exports = router; 