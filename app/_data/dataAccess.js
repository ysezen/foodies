import sql from 'better-sqlite3';
import xss from 'xss';
import randomData from '@/app/_utils/random.utils.js';

const db = sql('meals.db');


export const dataAccess = {
   /**
 * Inserts a single row of data into the database.
 *
 * @param {string} context - The SQL insert statement. For Example: `INSERT INTO meals (title, summary, instructions, image, creator, creator_email, image, slug, isactive, guid) VALUES (@title, @summary, @instructions, @image, @creator, @creator_email, @image, @slug, 1, @guid)`
 * @param {Array} data - An array containing a single row of data to insert.
 * @throws Will throw an error if data is not an array with exactly one element.
 * @example
 * await dataAccess.insert(mealsContext.insert(), meal);
 * // You can use only one row of data.
 */
   insert: async (context, data) => {
      if (!Array.isArray(data) || data.length !== 1) {
         throw new Error("Insert method expects a single row of data as an array.");
      }

      const stmt = db.prepare(`${context}`);
      stmt.run(data[0]);
   },
   bulkInsert: async (context, dataArray) => {
      const insertTransaction = db.transaction((dataBatch) => {
         const stmt = db.prepare(`${context}`);
         dataBatch.forEach(item => {
            stmt.run(item);
         });
      });

      try {
         insertTransaction(dataArray);
      } catch (error) {
         console.error("Error inserting data:", error);
         throw new Error("Insert operation failed");
      }
   },
   fetchAll: async (context) => {
      return db.prepare(`${context}`).all();
   },
   fetchById: async (context, id) => {
      return db.prepare(`${context}`).get(id);
   },
   fetchBySlug: async (context, slug) => {
      const result = db.prepare(`${context}`).get(slug);
      return result;
   },
   fetchByGuid: async (context, guid) => {
      return db.prepare(`${context}`).get(guid);
   },
};