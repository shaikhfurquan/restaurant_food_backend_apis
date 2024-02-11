import jwt from 'jsonwebtoken'


export const isAuthenticated = async (req, res, next) => {
    try {

        // getting the token from req.body
        const token = req.headers["authorization"].split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET , (err, decode) =>{
            if(err){
                return res.status(401).json({
                    success: false,
                    message : "Unauthorized user",
                })
            }else{
                req.body.id = decode.id
                next()

            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message : "Authentication failed, There is no token available",
            error : error.message 
            
        })
    }
}
