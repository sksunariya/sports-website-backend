const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const db = new sqlite3.Database('./db/database.db');
const jwt = require('jsonwebtoken');

// const SECRET_KEY = "noSecret";


exports.registerUser = async (req, res) => {
    const { username, email, password, skill_level, preferred_sport } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        db.run(`INSERT INTO users (username, email, password, skill_level, preferred_sport)
                VALUES (?, ?, ?, ?, ?)`,
                [username, email, hashedPassword, skill_level, preferred_sport],
                function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'User registered successfully', userId: this.lastID });
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to register user' });
    }
}


exports.login = (req, res) => {
    const { email, password } = req.body;

    db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (row) {
            const match = await bcrypt.compare(password, row.password);
            if (match) {
                const user = { id: row.id, username: row.username };
                const accessToken = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '1h' });
                res.json({ message: 'Login successful', accessToken });
            } else {
                res.status(400).json({ error: 'Invalid credentials' });
            }
        } else {
            res.status(400).json({ error: 'Invalid credentials' });
        }
    });
}