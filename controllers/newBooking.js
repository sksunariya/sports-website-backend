const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');

exports.newBooking = (req, res) => {
    const { user_id, court_id, date, time } = req.body;
    db.run(`INSERT INTO bookings (user_id, court_id, date, time)
            VALUES (?, ?, ?, ?)`,
            [user_id, court_id, date, time], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Booking created successfully', bookingId: this.lastID });
    });
}