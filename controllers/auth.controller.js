import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";

export const signUp = async (req, res, next) => {
    console.log("signup")
    const session = await mongoose.startSession();
    session.startTransaction();
    try {

        // create a new user
        // req.body -is an object containing data from the client 
        const { name, email, password } = req.body;
        console.log(req.body);
        


        // check if a user already exists
        const existingUser = await User.findOne({ email });
        
        if (existingUser) {
            
            const error = new Error("User already exists");
            error.statusCode = 409;
            throw error;

        }


        // hash password     means securing it because you never want to store password in plain text
        const salt = await bcrypt.genSalt(10);
        // bcrypt  -is a password-hashing library.it helps you securely store passwords in the database
        const hashedpassword = await bcrypt.hash(password, salt);
        const newUsers = await User.create({ name, email, password: hashedpassword });
        
        const token = jwt.sign({ userId: newUsers._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        await session.commitTransaction();
        session.endSession();
        res.status(201).json({
            success: true,
            message: "user created successsfully",
            data: {
                token,
                User: newUsers,
            }

        })

    }
    catch (error) {
        
        
        await session.abortTransaction();
        session.endSession();
        next(error);

    }
}
export const signIn = async (req, res, next) => {
try{
    const{email,password}=req.body;
    const user=await User.findOne({email});
    // if the user is not existing
    if(!user){
        const error =new Error("user not found");
        error.statusCode=404;
        throw error;
    }
// it is existing and  validate password
// it is compare to signup password and signin password
const isPasswordValid=await bcrypt.compare(password,user.password);
// if the password is not validate
if(!isPasswordValid){
    const error=new Error("invalid password");
    error.statusCode=401;
    throw error;
}
// if the password is validate generate new token
const token =jwt.sign({userId:user._id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN});
res.status(200).json({
    success:true,
    message:"user singned in successfully",
    data:{
        token,
        user,
    }
})
}catch(error){
    next(error);
}
}
export const signOut = async (req, res, next) => {

}