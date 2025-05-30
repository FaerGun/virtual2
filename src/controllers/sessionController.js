const Session = require('../models/Session');

// Получить все сессии пользователя
exports.getUserSessions = async (req, res) => {
    try {
        const sessions = await Session.find({ user: req.params.id });
        res.json(sessions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Завершить сессию пользователя
exports.deleteUserSession = async (req, res) => {
    try {
        const session = await Session.findOneAndDelete({ user: req.params.id, _id: req.params.sessionId });
        if (!session) return res.status(404).json({ message: 'Сессия не найдена' });
        res.json({ message: 'Сессия завершена' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};