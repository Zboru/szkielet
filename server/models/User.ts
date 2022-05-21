import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
const Schema = mongoose.Schema;

const Session = new Schema({
    refreshToken: {
        type: String,
        default: "",
    },
})

const User = new Schema({
    name: {
        type: String,
        default: "",
    },
    authStrategy: {
        type: String,
        default: "local",
    },
    refreshToken: {
        type: [Session],
    }
})

User.set("toJSON", {
    transform: function (doc, ret, options) {
        delete ret.refreshToken
        return ret
    },
})
User.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", User)