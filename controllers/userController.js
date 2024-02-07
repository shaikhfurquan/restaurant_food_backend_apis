
export const userRegister = async(req, res) =>{
    try {
        
    } catch (error) {
        res.status(404).json({
            succcess: false,
            message : "Error registering user",
            error: error.message
        })
    }
} 