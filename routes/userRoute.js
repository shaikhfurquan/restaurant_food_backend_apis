import express from 'express';
import { getAUser, updateUser, userLogin, userRegister , resetPassword, updatePassword } from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/isAuthenticate.js';

const userRouter = express.Router()

userRouter.post('/register', userRegister)
userRouter.post('/login', userLogin)

userRouter.get('/getuser', isAuthenticated , getAUser)
userRouter.put('/updateuser', isAuthenticated , updateUser)


userRouter.post('/reset-password', isAuthenticated , resetPassword)
userRouter.post('/update-password', isAuthenticated , updatePassword)

export default userRouter