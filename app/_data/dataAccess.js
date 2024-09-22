import sql from 'better-sqlite3';
import xss from 'xss';
import randomData from '@/app/_utils/random.utils.js';

const db = sql('meals.db');


export const dataAccess = {
   insert: async (context, data) => {

      const stmt = db.prepare(`${context}`);

      stmt.run(data);
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