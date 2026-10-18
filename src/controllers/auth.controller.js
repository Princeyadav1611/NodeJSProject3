require("dotenv").config();
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
async function registerUser(req, res) {
    const{username, email, password} = req.body;
        const isUserExists = await userModel.findOne({
        email
    })
    if(isUserExists){
        return res.status(409).json({
            message:"user already exists"
        })
    }
    const user = await userModel.create({
        username, email, password
    })
    const token = jwt.sign({
        id:user._id
    }, process.env.JWT_SECRET)

    res.cookie("token", token);

    res.status(201).json({
        message:"Token created Successfully",
        user:{
            user:user.username,
            email:user.email
        }, 
        token
    })
}

module.exports = {registerUser};