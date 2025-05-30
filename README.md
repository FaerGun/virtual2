# API для управления пользователями

REST API для управления пользователями с аутентификацией и авторизацией.

## Технологии

- Node.js
- Express
- MongoDB
- JWT для аутентификации
- bcrypt для хэширования паролей

## Установка

1. Клонируйте репозиторий
2. Установите зависимости:
```bash
npm install
```
3. Создайте файл .env и настройте переменные окружения:
```
PORT=3000
MONGO_URI=mongodb://localhost:27017/user-management
JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRATION=24h
```
4. Запустите сервер:
```bash
npm start
```

## API Endpoints

### Пользователи

#### Создание пользователя
- POST /api/users
- Body: { username, email, password, firstName, lastName }

#### Получение списка пользователей (только для админов)
- GET /api/users
- Query params: page, limit, sort

#### Получение пользователя по ID (только для админов)
- GET /api/users/:id

#### Обновление пользователя (только для админов)
- PUT /api/users/:id
- Body: { username, email, firstName, lastName, role, status }

#### Удаление пользователя (только для админов)
- DELETE /api/users/:id

#### Изменение статуса пользователя (только для админов)
- PATCH /api/users/:id/status
- Body: { status }

#### Поиск пользователей
- GET /api/users/search?query=search_term

#### Получение информации о текущем пользователе
- GET /api/users/me

## Тестирование

Для тестирования API используйте Postman. Импортируйте коллекцию из папки `postman`.

## Безопасность

- Все пароли хэшируются перед сохранением
- Используется JWT для аутентификации
- Реализована защита от брутфорса через rate limiting
- Используется helmet для защиты заголовков
- CORS настроен для безопасности 