
import express from 'express'
import { isAuthenticated } from '../middlewares/isAuthenticate.js'
import { createFood , getAllFoods, getFoodById, getFoodByRestaurantId} from '../controllers/foodController.js'

const foodRouter = express.Router()

foodRouter.post('/create' , isAuthenticated , createFood)
foodRouter.get('/get-all' , getAllFoods)
foodRouter.get('/get/:id' , getFoodById)
foodRouter.get('/get-by-restaurant/:id' , getFoodByRestaurantId)



export default foodRouter