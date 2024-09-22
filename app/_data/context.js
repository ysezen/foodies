
const mealsContext = {
   insert: () => {
      const stmt = 'INSERT INTO meals (title, summary, instructions, image, creator, creator_email, image, slug, isactive, guid) VALUES (@title, @summary, @instructions, @image, @creator, @creator_email, @image, @slug, 1, @guid)';
      return stmt;
   },
   fetchAll: () => {
      const stmt = `SELECT * FROM meals WHERE isactive = 1`;
      return stmt;
   },
   fetchById: () => {
      const stmt = `SELECT * FROM meals WHERE isactive = 1 AND id = ?`;
      return stmt;
   },
   fetchBySlug: () => {
      const stmt = `SELECT * FROM meals WHERE isactive = 1 AND slug = ?`;
      return stmt;
   },
   fetchByGuid: () => {
      const stmt = `SELECT * FROM meals WHERE isactive = 1 AND guid = ?`;
      return stmt;
   },
};

export default mealsContext;
