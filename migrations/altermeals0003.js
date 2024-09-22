const sql = require('better-sqlite3');
const { v4: uuidv4 } = require('uuid');

const db = sql('../meals.db');

// Step 2: Update all existing rows with a random UUID
const allRows = db.prepare(`SELECT id FROM meals WHERE guid IS NULL`).all(); // Select only rows needing an update

const transaction = db.transaction((rows) => {
   for (const row of rows) {
      const newGuid = uuidv4();
      db.prepare(`
         UPDATE meals SET guid = ? WHERE id = ?;
      `).run(newGuid, row.id);
   }
});

transaction(allRows); // Execute the transaction with all selected rows

console.log('UUIDs have been updated to all existing records.');