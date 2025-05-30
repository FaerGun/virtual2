const Notification = require('../models/Notification');

// Получить все уведомления пользователя
exports.getUserNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.params.id });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Отправить уведомление пользователю
exports.sendNotification = async (req, res) => {
    try {
        const notification = new Notification({
            user: req.params.id,
            title: req.body.title,
            message: req.body.message
        });
        await notification.save();
        res.status(201).json(notification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};