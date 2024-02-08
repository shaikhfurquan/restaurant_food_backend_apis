import UserModel from "../models/userModel.js"

export const userRegister = async (req, res) => {
    try {
        const { userName, email, password, phone, address } = req.body
        if (!username || !email || !password || !phone || !address) {
            return res.status(500).json({
                succcess: false,
                message: "Please enter provide all fields"
            })
        }
        const existingUser = await UserModel.findOne({ email })
        if (!existingUser) {
            return res.status(500).json({
                success: false,
                message : "Email already exists please login"
            })
        }

        const user = await UserModel.create({
            userName, email, password, address, phone
        })
        res.status(201).json({
            success : true,
            message : "User created successfully",
            user : user
        })
    } catch (error) {
        res.status(404).json({
            succcess: false,
            message: "Error registering user",
            error: error.message
        })
    }
} 


export const userLogin = (req, res) => {
    
}