import UserModel from "../models/userModel.js"
import bcrypt from 'bcryptjs'

export const userRegister = async (req, res) => {
    try {
        const { userName, email, password, phone, address } = req.body
        if (!userName || !email || !password || !phone || !address) {
            return res.status(500).json({
                success: false,
                message: "All fields are required"
            })
        }

        //checking whether the user is already is registered or not
        const existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            return res.status(500).json({
                success: false,
                message: "User already exists, Please Login"
            })
        }
        //hashing user password
        const hashPassword = await bcrypt.hash(password, 10)
        console.log("==>" , hashPassword);

        //create new user
        const user = await UserModel.create({ userName, email, password : hashPassword, phone, address })

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: user
        })
    } catch (error) {
        res.status(404).json({
            succcess: false,
            message: "Error while registering user",
            error: error.message
        })
    }
}


export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(403).json({
                succcess: false,
                message: "All fields are required"
            })
        }
        //check if the user registered or not
        const user = await UserModel.findOne({ email : email, password : password })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found, Register first",
            })
        }
        res.status(200).json({
            success: true,
            message: "Login successful",
            user: user

        })

    } catch (error) {
        res.status(404).json({
            succcess: false,
            message: "Error while login user",
            error: error.message
        })
    }
}