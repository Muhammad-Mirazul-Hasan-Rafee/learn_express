import express, { type Application, type Request, type Response } from "express";
import { Pool } from "pg";
const app: Application = express(); //This invokes (calls) that function. When executed, it creates and configures a brand-new Express application object
const port = 5000;

app.use(express.json());

const pool = new Pool({
  connectionString: "postgresql://neondb_owner:npg_WRlu8ieq9wXn@ep-spring-thunder-ahtmeuzt-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
});

const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, name VARCHAR(20), email VARCHAR(20) NOT NULL, password VARCHAR(20) NOT NULL, is_Active BOOLEAN DEFAULT true, age INT, create_At TIMESTAMP DEFAULT NOW(), update_At TIMESTAMP DEFAULT NOW() )
      
      `)
    console.log('Created db successfully')

  }
  catch (error) {
    console.log(error);
  }
};
initDB();

app.get('/', (req: Request, res: Response) => {
  // res.send('Hello World!');
  res.status(200).json({
    "message": "express server",
    "author": "next level",
  });
});
app.post('/', async (req: Request, res: Response) => {
  //console.log(req.body);
  const { name, id, password } = req.body;
  res.status(201).json({
    message: "Post created",
    data: { name, id },
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})