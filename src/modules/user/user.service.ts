import { pool } from "../../DB";
import type { IUser } from "./user.interface";


// create user
const createUserIntoDb = async (payLoad: IUser) => {
    const { name, email, password, age } = payLoad;
    const result = await pool.query(`INSERT INTO users( name, email, password, age) VALUES($1, $2, $3, $4) RETURNING * `, [name, email, password, age]);

    return result;

};

// create all
const getAllUsersFromDb = async () => {
    const result = await pool.query(`SELECT * FROM users`);
    return result;
};

// get a specific user
const getSpecificUserFromDb = async (id: string) => {
    const result = await pool.query(`SELECT * FROM users WHERE id=$1`, [id]);
    return result;
};

// update user
const updateUserInDb = async (payLoad: IUser, id:string, is_active:boolean) => {
    const{name, password, age} = payLoad;
    const result = await pool.query(
        ` 
    UPDATE users 
    SET 
    name=COALESCE($1,name),
    password=COALESCE($2,password),
    age=COALESCE($3,age),
    is_active=COALESCE($4,is_active) 

    WHERE id=$5 RETURNING *
    `,
        [name, password, age, is_active, id],
    );
    return result;
};
// delete user
const deleteUserFromDb = async(id:string)=>{
            const result = await pool.query(`
      DELETE FROM users WHERE id=$1
      `, [id]);
      return result;
}

export const userService = { createUserIntoDb, getAllUsersFromDb, getSpecificUserFromDb, updateUserInDb, deleteUserFromDb};