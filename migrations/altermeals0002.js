const sql = require('better-sqlite3');
const { v4: uuidv4 } = require('uuid');

const db = sql('../meals.db');

// Step 1: Alter the table to add a new column for UUID
db.prepare(`
   ALTER TABLE meals ADD COLUMN guid TEXT DEFAULT NULL;
`).run();

// Step 2: Update all existing rows with a random UUID
const updateStmt = db.prepare(`
   UPDATE meals SET guid = ? WHERE guid IS NULL;
`);

const allRows = db.prepare(`SELECT * FROM meals`).all();

for (const row of allRows) {
   const newGuid = uuidv4(); // Generate a new UUID
   updateStmt.run(newGuid); // Update the row with the new UUID
}

console.log('UUIDs have been added to all existing records.');