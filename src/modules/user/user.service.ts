import { pool } from "../../DB";
import type { IUser } from "./user.interface";

const createUserIntoDb = async (payLoad: IUser) =>{
    const {name, email, password, age} = payLoad;
     const result = await pool.query(`INSERT INTO users( name, email, password, age) VALUES($1, $2, $3, $4) RETURNING * `, [name, email, password, age]);

     return result;

};

export const userService = {createUserIntoDb};