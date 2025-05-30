const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate, authorize } = require('../middleware/auth');

// Публичные маршруты
router.post('/', userController.createUser);
router.get('/search', userController.searchUsers);

// Защищенные маршруты
router.use(authenticate);

// Маршруты для всех аутентифицированных пользователей
router.get('/me', (req, res) => {
    res.json(req.user);
});

// Маршруты для администраторов
router.get('/', authorize('admin'), userController.getUsers);
router.get('/:id', authorize('admin'), userController.getUserById);
router.put('/:id', authorize('admin'), userController.updateUser);
router.delete('/:id', authorize('admin'), userController.deleteUser);
router.patch('/:id/status', authorize('admin'), userController.updateUserStatus);

module.exports = router; 