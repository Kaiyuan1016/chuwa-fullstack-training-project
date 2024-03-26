const mongoose = require("mongoose");
const roles = require("../rules/authorization");

const userSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
        },
        role:{
            type:String,
            enum:[roles.ADMIN,roles.CUSTOMER],
            default:roles.CUSTOMOER,
        },

    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;