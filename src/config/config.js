require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/user-management',
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
    jwtExpiration: process.env.JWT_EXPIRATION || '24h',
    rateLimitWindow: 15 * 60 * 1000, // 15 минут
    rateLimitMax: 100 // limit each IP to 100 requests per windowMs
};