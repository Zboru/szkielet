import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User, { UserLoginValidationSchema } from "../models/User";
export class AuthController {
    public static async loginUser(req: Request, res: Response): Promise<void> {
        try {
            const { error, value } = UserLoginValidationSchema.validate(req.body);

            if (error !== undefined) {
                const message = error.details.map(i => i.message).join(',')
                throw message;
            }

            const user = await User.findOne({ email: value.email })

            if (!user) {
                throw "Błędny email lub hasło";
            }

            const validPassword = await bcrypt.compare(
                value.password,
                user.password
            )

            if (!validPassword) {
                throw "Błędny email lub hasło";
            }

            const token = user.generateAuthToken();

            res.status(200).json({ data: token, message: "Zalogowano!" })
        } catch (err) {
            res.status(500).json({
                status: 'Failed',
                message: err
            })
        }
    }
}