import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import dotenv from "dotenv"
dotenv.config();

import { Role, User } from "../entities/User.Entitie";
import { AppDataSource } from "../config/data-source";

export class UserAuth {

    static async userRegister(req: Request, res: Response) {
        try {
            const { name, email, password, role } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({ message: "All fields are required" });
            }

            if (role && !Object.values(Role).includes(role)) {
                return res.status(400).json({ message: "Invalid role provided" });
            }

            const userRepo = AppDataSource.getRepository(User);

            // const CheckUserExist = await AppDataSource.manager.findOne(User, { where: { email: email } })
            const existingUser = await userRepo.findOne({ where: { email } })

            if (existingUser) {
                return res.status(409).json({ message: "Email already exists" })
            }

            const hashPassword = await bcrypt.hash(password, 10)
            // console.log(hashPassword);

            // const user = new User()
            // user.name = name;
            // user.email = email;
            // user.password = hashPassword;
            // user.role = role || Role.USER;
            const user = userRepo.create({
                name,
                email,
                password: hashPassword,
                role: role || Role.USER,
            })
            // console.log("User register data is : ", user);

            // await AppDataSource.manager.save(user)
            await userRepo.save(user)

            const { password: _, ...userWithoutPassword } = user
            res.status(201).json({
                message: "User created SuccessFully",
                User: userWithoutPassword,

                user
            });
        } catch (error) {
            console.error("Error creating product:", error);
            res.status(500).json({ error: "Error creating product" });
        }
    }


    static async UserLogin(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            // Validate input
            if (!email || !password) return res.status(404).json({ message: "All fields are required" });

            const userRepo = AppDataSource.getRepository(User);
            const user = await userRepo.findOne({ where: { email } });
            if (!user) return res.status(409).json({ error: "User not found" })

            // Compare password
            const isPasswordMatch = await bcrypt.compare(password, user.password)
            if (!isPasswordMatch) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            // Authentication method
            const token = jwt.sign(
                { userId: user.id, email: user.email, role: user.role },
                process.env.SECRET_KEY as string
                , { expiresIn: '1h' })
            // console.log("object,",user.role);

            const { password: _, ...userWithoutPassword } = user
            return res.status(200).json({ message: "Login Success", token, userWithoutPassword });

        } catch (error) {
            console.error("Error getting while login:", error);
            res.status(500).json({ error: "Error While Login" });
        }
    }

    //   static async getProducts(req: Request, res: Response) {
    //     try {
    //       debugger;
    //       const products = await AppDataSource.manager.find(Product, {
    //         relations: ["images"],
    //       });
    //       res.status(200).json(products);
    //     } catch (error) {
    //       console.error("Error fetching products:", error);
    //       res.status(500).json({ error: "Error fetching products" });
    //     }
    //   }

    static async getAllUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userRepo = AppDataSource.getRepository(User)
            const users = await userRepo.find({
                select: ["id", "name", "email", "role", "createdAt", "updatedAt"],
            });
            res.status(200).json({
                message: "All users fetched successfully",
                users,
            });
        } catch (error) {
            console.error("Error fetching users:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

}