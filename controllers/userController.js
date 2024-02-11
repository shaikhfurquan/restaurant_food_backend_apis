import UserModel from "../models/userModel.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const userRegister = async (req, res) => {
    try {
        const { userName, email, password, phone, address , answer} = req.body
        if (!userName || !email || !password || !phone || !address || !answer) {
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

        //create new user
        const user = await UserModel.create({ ...req.body, password: hashPassword });


        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: user
        })
    } catch (error) {
        res.status(500).json({
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
        const user = await UserModel.findOne({ email: email })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found, Register first",
            })
        }
        //compare password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(404).json({ success: false, message: "Invalid credentials" })
        }

        //jwt authentication token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        })
        user.password = undefined
        res.status(200).json({
            success: true,
            message: "Login successful",
            token: token,
            user: user,

        })

    } catch (error) {
        res.status(404).json({
            succcess: false,
            message: "Error while login user",
            error: error.message
        })
    }
}


export const getAUser = async (req, res) => {
    try {
        //getting the id from req.body.user
        const id = req.body.id
        console.log(id);
        const user = await UserModel.findById({ _id: id }).select("-password")
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User With this id not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "user data",
            user: user
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error getting user",
            error: error.message
        })
    }
}


export const getAllUsers = async (req, res) => {
    try {
        const AllUsers = await UserModel.find()
        if(!AllUsers){
            return res.status(404).json({
                succcess : false,
                message: "Error getting all users"
            })
        }

        res.status(200).json({
            succcess : true,
            message : "All users are",
            AllUsers : AllUsers
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error getting users",
            error: error.message
        })
    }
}

export const updateUser = async (req, res) => {
    try {
        //getting the id from req.body.user
        const id = req.body.id
        const user = await UserModel.findOne({ _id: id })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User With this id not found"
            })
        }

        console.log("user" , user);
        //updating the three values
        const { userName, address, phone } = req.body
        if (userName) user.userName = userName
        if (address) user.address = address
        if (phone) user.phone = phone

        await user.save()
        res.status(200).json({
            success: true,
            message: 'User saved successfully',
            user : user
        })
    } catch (error) {
        res.status(500).json({
            succcess: false,
            message: "Error while updating user",
            error: error.message
        })
    }
}


export const resetPassword = async (req, res) => {
    try {
        // finding user on the basis of email
        const {email, newPassword , answer} = req.body
        if(!email || !newPassword || !answer) {
            return res.status(500).json({
                succcess: false,
                message: "Please provide all fields"
            })
        }

        const user = await UserModel.findOne({email, answer})
        if(!user){
            return res.status(500).json({
                succcess: false,
                message : "User not found, Invalid answer"
            })
        }

        //hashing the newPassword
        const hashPassword = await bcrypt.hash(newPassword , 10)
        user.password = hashPassword
        await user.save()

        res.status(200).json({
            success : true,
            message : "Password reset successfully"
        })
    } catch (error) {
        res.status(500).json({
            succcess: false,
            message: "Error while updating user password",
            error: error.message
        })
    }
}


export const updatePassword = async (req, res) => {
    try {
        //finding user on the basis of id
        const user = await UserModel.findById({_id : req.body.id})
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found with this id"
            })
        }

        //getting the data from the req.body
        const {oldPassword, newPassword} = req.body
        if(!oldPassword || !newPassword){
            return res.status(404).json({
                success: false,
                message : "Please provide OldPassword and NewPassword"
            })
        }

        //compare the oldPassword and userPassword
        const isMatch = await bcrypt.compare(oldPassword, user.password)
        if(!isMatch){
            return res.status(500).json({
                success: false,
                message : "Invalid old password"
            })
        }

        //hashing the password
        const hashPassword = await bcrypt.hash(newPassword , 10)
        user.password = hashPassword
        await user.save()

        res.status(200).json({
            success : true,
            message : "Password updated successfully"
        })
    } catch (error) {
        res.status(500).json({
            succcess: false,
            message: "Error while updating user password",
            error: error.message
        })
    }
}



export const deleteUser = async(req, res) => {
    try {
        const deleteUser = await UserModel.findByIdAndDelete(req.params.id)
        if(!deleteUser){
            return res.status(404).json({
                success: false,
                message: "User with this Id not found"
            })
        }

        res.status(200).json({
            success: true,
            message : "User deleted successfully"
        })

    } catch (error) {
        res.status(500).json({
            succcess: false,
            message: "Error while deleting user",
            error: error.message
        })
    }
}