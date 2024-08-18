const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');

db.serialize(() => {
    // Create Users Table
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        email TEXT UNIQUE,
        password TEXT,
        skill_level TEXT,
        preferred_sport TEXT
    )`);

    // Create Courts Table
    db.run(`CREATE TABLE IF NOT EXISTS courts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        location TEXT,
        sport TEXT,
        availability TEXT
    )`);

    // Create Bookings Table
    db.run(`CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        court_id INTEGER,
        date TEXT,
        time TEXT,
        FOREIGN KEY(user_id) REFERENCES users(id),
        FOREIGN KEY(court_id) REFERENCES courts(id)
    )`);
});

db.close();
console.log('Database initialized');
