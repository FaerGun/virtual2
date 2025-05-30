const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Создание пользователя
exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        
        const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
            expiresIn: config.jwtExpiration
        });

        res.status(201).json({
            message: 'Пользователь успешно создан',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            },
            token
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Получение списка пользователей
exports.getUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10, sort = '-createdAt', ...filters } = req.query;
        
        const query = User.find(filters)
            .sort(sort)
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const [users, total] = await Promise.all([
            query.exec(),
            User.countDocuments(filters)
        ]);

        res.json({
            users: users.map(user => ({
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                status: user.status,
                createdAt: user.createdAt
            })),
            totalPages: Math.ceil(total / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Получение пользователя по ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }
        
        res.json({
            id: user._id,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            status: user.status,
            avatar: user.avatar,
            lastLogin: user.lastLogin,
            createdAt: user.createdAt
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Обновление пользователя
exports.updateUser = async (req, res) => {
    try {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['username', 'email', 'firstName', 'lastName', 'role', 'status'];
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return res.status(400).json({ message: 'Недопустимые поля для обновления' });
        }

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        updates.forEach(update => user[update] = req.body[update]);
        await user.save();

        res.json({
            message: 'Пользователь успешно обновлен',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                status: user.status
            }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Удаление пользователя
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }
        res.json({ message: 'Пользователь успешно удален' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Изменение статуса пользователя
exports.updateUserStatus = async (req, res) => {
    try {
        const { status } = req.body;
        if (!['active', 'inactive', 'blocked'].includes(status)) {
            return res.status(400).json({ message: 'Недопустимый статус' });
        }

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        user.status = status;
        await user.save();

        res.json({
            message: 'Статус пользователя успешно обновлен',
            user: {
                id: user._id,
                username: user.username,
                status: user.status
            }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Поиск пользователей
exports.searchUsers = async (req, res) => {
    try {
        const { query } = req.query;
        const users = await User.find({
            $or: [
                { username: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } },
                { firstName: { $regex: query, $options: 'i' } },
                { lastName: { $regex: query, $options: 'i' } }
            ]
        }).limit(10);

        res.json(users.map(user => ({
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            status: user.status
        })));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 