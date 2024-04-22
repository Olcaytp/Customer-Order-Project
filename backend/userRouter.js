const express = require('express');
const router = express.Router();
const db = require('./db'); // db bağlantısı
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('./config');

// Middleware
router.use(express.json());

// Kullanıcı girişi
router.post('/signin', (req, res) => {
    const { email, password } = req.body;

    // Kullanıcıyı veritabanından sorgula
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], async (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Internal server error' });
            throw err;
        }
        if (result.length == 0) {
            res.status(401).json({ error: 'Invalid email or password' });
        } else {
            // Kullanıcı bulundu, şimdi parolayı kontrol et
            const user = result[0];
            if (password == user.password) {
                // Parola doğru, kullanıcıya giriş izni ver
                res.status(200).json({ message: 'Login successful' });
            } else {
                // Parola yanlış
                res.status(401).json({ error: 'Invalid email or password' });
            }
        }
    });
});


// Tüm kullanıcıları listeleme
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Internal server error' });
            throw err;
        }
        res.json(result);
    });
});

// Yeni bir kullanıcı oluşturma
router.post('/', (req, res) => {
    const { username, email, password, role } = req.body;
    const sql = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
    db.query(sql, [username, email, password, role], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Internal server error' });
            throw err;
        }
        res.json({
            message: 'User added successfully',
            userId: result.insertId,
            username: username,
            email: email,
            role: role
        });

    });
});

// Belirli bir kullanıcıyı güncelleme
router.put('/:userId', (req, res) => {
    const userId = req.params.userId;
    const { username, email, password, role } = req.body;
    const sql = 'UPDATE users SET username = ?, email = ?, password = ?, role = ? WHERE user_id = ?';
    db.query(sql, [username, email, password, role, userId], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Internal server error' });
            throw err;
        }
        res.json({ message: 'User updated successfully', userId });
    });
});

// Belirli bir kullanıcıyı silme
router.delete('/:userId', (req, res) => {
    const userId = req.params.userId;
    const sql = 'DELETE FROM users WHERE user_id = ?';
    db.query(sql, [userId], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Internal server error' });
            throw err;
        }
        res.json({ message: 'User deleted successfully', userId });
    });
});

module.exports = router;
