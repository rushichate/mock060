const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { UserModel } = require("../modeles/user.model")
const userRouter = express.Router()

userRouter.post("/signup",async(req,res)=>{
    const {email,password} = req.body
    try{
        const hashPassword = bcrypt.hashSync(password,5)
        const newUser = new UserModel({email,password:hashPassword})
        await newUser.save()
        res.status(200).json({message:"User signup successful"})
    }catch(error){
        res.status(400).json(error)
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try{
        const isEmailValid = await UserModel.findOne({email})
        if(!isEmailValid){
            return res.status(201).json({message:"Please Enter Valid Email"})
        }
        const isPasswordValid = bcrypt.compareSync(password,isEmailValid.password)
        if(!isPasswordValid){
            return res.status(201).json({message:"Wrong Credentials"})
        }
        const token = jwt.sign({userId:isEmailValid._id},"masai",{expiresIn:"20m"})
        res.status(200).json({message:"Login Successful",token:token})
    }catch(error){
        res.status(400).json(error)
    }
})


module.exports={
    userRouter
}