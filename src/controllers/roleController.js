const Role = require('../models/Role');

// Создать роль
exports.createRole = async (req, res) => {
    try {
        const role = new Role(req.body);
        await role.save();
        res.status(201).json(role);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Получить все роли
exports.getRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.json(roles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Получить роль по id
exports.getRoleById = async (req, res) => {
    try {
        const role = await Role.findById(req.params.id);
        if (!role) return res.status(404).json({ message: 'Роль не найдена' });
        res.json(role);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Обновить роль
exports.updateRole = async (req, res) => {
    try {
        const role = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!role) return res.status(404).json({ message: 'Роль не найдена' });
        res.json(role);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Удалить роль
exports.deleteRole = async (req, res) => {
    try {
        const role = await Role.findByIdAndDelete(req.params.id);
        if (!role) return res.status(404).json({ message: 'Роль не найдена' });
        res.json({ message: 'Роль удалена' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 