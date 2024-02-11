import express from 'express';
import { getAUser, getAllUsers , updateUser, userLogin, userRegister , resetPassword, updatePassword, deleteUser } from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/isAuthenticate.js';

const userRouter = express.Router()

userRouter.post('/register', userRegister)
userRouter.post('/login', userLogin)

userRouter.get('/getuser', isAuthenticated , getAUser)
userRouter.get('/all-users', isAuthenticated , getAllUsers)
userRouter.put('/updateuser', isAuthenticated , updateUser)


userRouter.post('/reset-password', isAuthenticated , resetPassword)
userRouter.post('/update-password', isAuthenticated , updatePassword)

userRouter.delete('/delete-user/:id', isAuthenticated , deleteUser)

export default userRouter