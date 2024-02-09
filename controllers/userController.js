import UserModel from "../models/userModel.js"

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

        //create new user
        const user = await UserModel.create({ userName, email, password, phone, address })

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


export const userLogin = (req, res) => {

}