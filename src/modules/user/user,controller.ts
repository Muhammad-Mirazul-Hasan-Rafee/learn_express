import type { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
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

const getAllUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.getAllUsersFromDb();

        return res.status(200).json({
            success: true,
            message: "Users retrieved successfully!",
            data: result.rows,
        });

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getSpecificUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await userService.getSpecificUserFromDb(id as string);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                data: {},
            });
        }

        return res.status(200).json({
            success: true,
            message: "Individual user retrieved successfully!",
            data: result.rows[0],
        });

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { is_active } = req.body;


    try {
        const result = await userService.updateUserInDb(req.body, id as string, is_active as boolean);

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User Not found!",
            });
        }

        // console.log(result);
        res.status(200).json({
            success: true,
            message: "User updated successfully!",
            data: result.rows[0],
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
};

const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
const result = await userService.deleteUserFromDb(id as string);
        if (result.rowCount === 0) {
            res.status(404).json({ 
                success: false,
                message: "User Not found!",
            });
        }
        res.status(200).json({
            success: true,
            message: "User deleted successfully!",
            data: {},
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
};

export const userController = { createUser, getAllUser, getSpecificUser, updateUser, deleteUser };