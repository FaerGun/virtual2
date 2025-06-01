const getAvatar = (req, res) => {
    // Логика для получения аватара пользователя
    res.send('Аватар пользователя');
};

const updateAvatar = (req, res) => {
    // Логика для обновления аватара пользователя
    res.send('Аватар обновлён');
};

const uploadAvatar = (req, res) => {
    // Логика для загрузки аватара пользователя
    res.send('Аватар загружен');
};

const deleteAvatar = (req, res) => {
    // Логика для удаления аватара пользователя
    res.send('Аватар удалён');
};

module.exports = {
    getAvatar,
    updateAvatar,
    uploadAvatar,
    deleteAvatar
}; 