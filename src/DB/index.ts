import { Pool } from "pg";
import config from "../config";

export  const pool = new Pool({
  connectionString: config.CONNECTIVITYSTR,
});

export const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS 
      users(
       id SERIAL PRIMARY KEY,
       name VARCHAR(20), 
       email VARCHAR(20) UNIQUE NOT NULL, 
       password VARCHAR(20) NOT NULL, 
       is_Active BOOLEAN DEFAULT true, 
       age INT, 
       create_At TIMESTAMP DEFAULT NOW(), 
       update_At TIMESTAMP DEFAULT NOW() )
      
      `)
    console.log('Created db successfully')
  }
  catch (error) {
    console.log(error);
  }
};