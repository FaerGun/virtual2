const express = require('express');
const router = express.Router();

router.get('/users', (req, res) => res.json({ message: 'Статистика по пользователям' }));
router.get('/roles', (req, res) => res.json({ message: 'Статистика по ролям' }));
router.get('/active', (req, res) => res.json({ message: 'Активные пользователи' }));
router.get('/blocked', (req, res) => res.json({ message: 'Заблокированные пользователи' }));

module.exports = router; 