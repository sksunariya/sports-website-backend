const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');

exports.getCourts = (req, res) => {
    db.all(`SELECT * FROM courts`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
}