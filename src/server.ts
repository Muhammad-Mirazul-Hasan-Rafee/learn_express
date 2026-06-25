import express, { type Application, type Request, type Response } from "express";
const app : Application = express(); //This invokes (calls) that function. When executed, it creates and configures a brand-new Express application object
const port = 5000;

app.get('/', (req: Request, res: Response) => {
 // res.send('Hello World!');
  res.status(200).json({
    "message":"express server",
    "author": "next level",
  });
});
app.post('/' , async(req:Request , res:Response)=>{
console.log(req);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})