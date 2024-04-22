// authUtils.js

const jwt = require('jsonwebtoken');

// Özel anahtar oluşturma
const privateKey = 'buraya_özel_anahtarınızı_yerleştirin'; // Özel anahtarınızı buraya yerleştirin

// Token oluşturma işlevi
const generateToken = (user) => {
    const token = jwt.sign(user, privateKey, { expiresIn: '1h' });
    return token;
};

module.exports = { generateToken };
