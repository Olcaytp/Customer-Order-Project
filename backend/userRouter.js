const express = require('express');
const router = express.Router();
const db = require('./db'); // db connection

// Middleware
router.use(express.json());

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
router.post('/signup', (req, res) => {
    const { username, email, password } = req.body;
    const query = `INSERT INTO users (username, email, password, role) VALUES ('${username}', '${email}', '${password}', 'user')`;
    db.query(query, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Internal server error' });
            throw err;
        }
        res.status(201).json({ message: 'User created successfully' });
    });
});



// Kullanıcı girişi
router.post('/signin', (req, res) => {
    const { email, password } = req.body;
    const query = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Internal server error' });
            throw err;
        }
        if (results.length > 0) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
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
