import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

export const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

UserSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET || "", {
        expiresIn: "7d",
    })
    return token;
}

export const UserValidationSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: passwordComplexity().required(),
})

const User = mongoose.model('User', UserSchema);
export default User;