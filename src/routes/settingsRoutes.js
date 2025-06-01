const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.json({ message: 'Получить настройки' }));
router.put('/', (req, res) => res.json({ message: 'Обновить настройки' }));
 
module.exports = router; 