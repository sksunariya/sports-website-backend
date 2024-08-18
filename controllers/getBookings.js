const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');

exports.getBookings = (req, res) => {
    const { user_id } = req.body;
    console.log("userID is",user_id)
    db.all(`SELECT * FROM bookings WHERE user_id = ?`, [user_id], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
}