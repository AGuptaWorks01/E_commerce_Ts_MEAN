import { Request, Response } from "express";
import { User } from "../entity/UserAuth";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { AppDataSource } from "../config/data-source";
import dotenv from "dotenv"

dotenv.config();
export class UserAuth {

    static async userRegister(req: Request, res: Response) {
        try {
            const { email, password } = req.body
            if (!email || !password) return res.status(404).json("All filed are required")

            const CheckUserExist = await AppDataSource.manager.findOne(User, { where: { email: email } })

            if (CheckUserExist) return res.status(409).json("Email already Exists")

            const saltRound = 10;
            const hashPassword = await bcrypt.hash(password, saltRound)
            console.log(hashPassword);

            const user = new User()
            user.email = email;
            user.password = hashPassword;
            console.log("User register data is : ", user);

            await AppDataSource.manager.save(user)
            res.status(201).json({
                message: "User created SuccessFully",
                User: user,
            });
        } catch (error) {
            console.error("Error creating product:", error);
            res.status(500).json({ error: "Error creating product" });
        }
    }


    static async UserLogin(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            if (!email || !password) return res.status(404).json("All field are required");

            const user = await AppDataSource.manager.findOne(User, { where: { email: email } })
            if (!user) return res.status(409).json({ error: "User not found" })

            const isPasswordMatch = await bcrypt.compare(password, user.password)
            if (!isPasswordMatch) {
                return res.status(401).json({ error: "Invalid credentials" });
            }


            const token = jwt.sign({ userId: user.id, email: user.email }, process.env.SECRET_KEY as string
                , { expiresIn: '1h' })
            return res.status(200).json({ message: "Login Success", token });

        } catch (error) {
            console.error("Error getting while login:", error);
            res.status(500).json({ error: "Error While Login" });
        }
    }
}