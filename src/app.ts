import express, { type Application, type Request, type Response } from "express";
import { userRoute } from "./modules/user/user.route";
import { profileRoute } from "./modules/profile/profile.route";
const app: Application = express(); //This invokes (calls) that function. When executed, it creates and configures a brand-new Express application object

app.use(express.json());


app.get('/', (req: Request, res: Response) => {

  res.status(200).json({
    success: true,
    "message": "express server",
    "author": "next level",
  });
});

app.use('/api/users', userRoute);
app.use('/api/profile', profileRoute);


export default app;
