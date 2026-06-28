import type { Request, Response } from "express";
import { pool } from "../../DB";
import { userService } from "./user.service";

const createUser =  async (req: Request, res: Response) => {
        //console.log(req.body);
       // const { name, email, password, age } = req.body;
        try {
           const result = await userService.createUserIntoDb(req.body);
            //  console.log(result);
            res.status(201).json({
                success: true,
                // message: "User created successfully!",
                data: result.rows[0],
            });
        } catch (error: any) {
            res.status(500).json({
                message: error.message,
                error: error,
            });

        };
    };

    export const userController =  {createUser};

    // 8-3 Implementing Modular pattern