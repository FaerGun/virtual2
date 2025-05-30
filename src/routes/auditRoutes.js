const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.json({ message: 'Все логи' }));
router.get('/:id', (req, res) => res.json({ message: 'Лог по id' }));
router.get('/user/:userId', (req, res) => res.json({ message: 'Логи по пользователю' }));
router.get('/action/:action', (req, res) => res.json({ message: 'Логи по действию' }));

module.exports = router; 