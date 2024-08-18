const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');

exports.searchCourtByLocation = (req, res) => {
    const { location, sport } = req.query;
    db.all(`SELECT * FROM courts WHERE location = ? AND sport = ?`,
           [location, sport], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
}