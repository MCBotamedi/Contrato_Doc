const { Pool } = require('pg');

const config = {
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_DATABASE,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT
};

class Database {
  static instance;
  static pool;

  constructor() {
    console.log(config);
    if (!Database.pool)
      Database.pool = new Pool(config);
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  async query(text, params) {
    try {
      if (!Database.pool) {
        Database.pool = new Pool(config)
      }
      const result = await Database.pool.query(text, params);
      return result.rows;
    } catch (error) {
      console.error('Erro ao executar query:', error);
      throw error;
    }
  }

  async close() {
    if (Database.pool) {
      await Database.pool.end();
      Database.pool = null;
    }
  }
}

module.exports = Database;
