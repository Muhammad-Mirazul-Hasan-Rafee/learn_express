import { pool } from "../../DB";

const createProfileIntoDb = async(payLoad: any)=>{

const {user_id, bio, address, phone, gender} = payLoad;

// 1. check whether user is exists or not
const user = await pool.query(`
    SELECT * FROM users WHERE id=$1
    `,[user_id]);
    console.log(payLoad);
console.log(user_id);
console.log(typeof user_id); 

if(user.rows.length === 0){
    throw new Error("User not found! Go and sleep...");
}
const result = await pool.query(`INSERT INTO profiles(user_id, bio, address, phone, gender) VALUES($1, $2,$3, $4, $5) RETURNING *`,[user_id, bio, address, phone, gender]);
return result;
};

export const  profileService = {createProfileIntoDb};