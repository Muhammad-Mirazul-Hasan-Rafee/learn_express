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
initDB();

app.get('/', (req: Request, res: Response) => {
  // res.send('Hello World!');
  res.status(200).json({
    success: true,
    "message": "express server",
    "author": "next level",
  });
});
app.post('/api/users', async (req: Request, res: Response) => {
  //console.log(req.body);
  const { name, email, password, age } = req.body;
  try {
    const result = await pool.query(`INSERT INTO users( name, email, password, age) VALUES($1, $2, $3, $4) RETURNING * `, [name, email, password, age]);
    //  console.log(result);
    res.status(201).json({
      success: true,
      // message: "User created successfully!",
      data: result.rows[0],
    });
  } catch (error:any) {
     res.status(500).json({
       message: error.message,
       error: error,
    });

  }
});

app.get('/api/users' , async(req: Request, res: Response) =>{
  try {
    const result = await pool.query(`SELECT * FROM users`);
    res.status(200).json({
      success: true,
      message:"User retrived successfully!!",
      data: result.rows,
    });
    
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message:error.message,
      error: error,
    });
    
  }
});

app.get('/api/users/:id', async(req:Request, res:Response)=>{
  const {id} = req.params;
  console.log(id);
  try {
     const result = await pool.query(`SELECT * FROM users WHERE id=$1`,[id]);
     console.log(result);
     if(result.rows.length === 0){
      res.status(500).json({
      success: false,
      message:'user not found!',
      data:{},
    });
     }
         res.status(200).json({
      success: true,
      message:"Individual user retrived successfully!!",
      data: result.rows,
    });
    
  } catch (error:any) {
        res.status(500).json({
      success: false,
      message:error.message,
      error: error,
    });
    
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
// 9.43