import User, { UserValidationSchema } from "../models/User";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

export class UserController {

    public static async getUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await User.find();
            res.status(200).json(users)
        } catch (err) {
            res.status(500).json({
                status: "Failed",
                message: err
            })
        }
    }

    public static async storeUser(req: Request, res: Response): Promise<void> {
        try {
            const { value, error } = UserValidationSchema.validate(req.body);
    
            if (error !== undefined) {
                const message = error.details.map(i => i.message).join(',')
                throw message;
            }
    
            const user = await User.findOne({ email: req.body.email });
    
            if (user) {
                res.status(409).json({
                    message: "User already exists!"
                })
            } else {
                const salt = await bcrypt.genSalt(Number(process.env.SALT));
                const hashedPassword = await bcrypt.hashSync(req.body.password, salt);
    
                const user = await new User({ ...value, password: hashedPassword }).save();
                res.status(201).send(user);
            }
        } catch (err) {
            res.status(500).json({
                status: 'Failed',
                message: err
            })
        }
    }
}