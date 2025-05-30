const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');

exports.authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ message: 'Требуется аутентификация' });
        }

        const decoded = jwt.verify(token, config.jwtSecret);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: 'Пользователь не найден' });
        }

        if (user.status === 'blocked') {
            return res.status(403).json({ message: 'Пользователь заблокирован' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Неверный токен' });
    }
};

exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                message: 'У вас нет прав для выполнения этого действия' 
            });
        }
        next();
    };
}; 