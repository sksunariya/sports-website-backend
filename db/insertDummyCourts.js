const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');

db.serialize(() => {
    const insertCourt = db.prepare(`INSERT INTO courts (name, location, sport, availability) VALUES (?, ?, ?, ?)`);

    const courtsData = [
        ['City Park Field', 'Downtown', 'Football', 'Available'],
        ['Riverside Court', 'Riverside', 'Padel', 'Available'],
        ['Green Meadow Field', 'West End', 'Football', 'Available'],
        ['Sunnyvale Court', 'Sunnyvale', 'Padel', 'Available'],
        ['Hilltop Field', 'North Hill', 'Football', 'Unavailable'],
        ['Lakeside Court', 'Lakeside', 'Padel', 'Available'],
        ['Eastwood Field', 'Eastwood', 'Football', 'Available'],
        ['Pine Grove Court', 'Pine Grove', 'Padel', 'Unavailable'],
        ['Southside Field', 'Southside', 'Football', 'Available'],
        ['Valley View Court', 'Valley View', 'Padel', 'Available'],
        ['Cedar Grove Field', 'Cedar Grove', 'Football', 'Unavailable'],
        ['Harbor View Court', 'Harbor View', 'Padel', 'Available'],
        ['Maple Leaf Field', 'Maple Leaf', 'Football', 'Available'],
        ['Spring Valley Court', 'Spring Valley', 'Padel', 'Unavailable'],
        ['Elm Street Field', 'Elm Street', 'Football', 'Available'],
        ['Grand Oaks Court', 'Grand Oaks', 'Padel', 'Available'],
        ['Highland Park Field', 'Highland Park', 'Football', 'Unavailable'],
        ['Willow Creek Court', 'Willow Creek', 'Padel', 'Available'],
        ['Oak Ridge Field', 'Oak Ridge', 'Football', 'Available'],
        ['Sunset Boulevard Court', 'Sunset Boulevard', 'Padel', 'Unavailable']
    ];

    for (const court of courtsData) {
        insertCourt.run(court, function(err) {
            if (err) {
                console.error(`Error inserting court ${court[0]}:`, err.message);
            } else {
                console.log(`Court ${court[0]} inserted successfully with ID ${this.lastID}`);
            }
        });
    }

    insertCourt.finalize();
});

db.close();
