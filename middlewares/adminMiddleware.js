
import UserModel from '../models/userModel.js'

export const adminMiddleware = async (req, res, next) => {
    try {
        // finding wheather the login user is admin or not
        const user = await UserModel.findById(req.body.id)
        if(user.userType !== "admin"){
            return res.status(404).json({
                success: false,
                message : "Only admin can access"
            })
        }else{
            next()
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Un-Authorized Access",
            error: error.message
        })
    }
}