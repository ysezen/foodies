const sql = require('better-sqlite3');
const db = sql('../meals.db');

db.prepare(`
   ALTER TABLE meals ADD COLUMN isActive INTEGER DEFAULT 1;
`).run();