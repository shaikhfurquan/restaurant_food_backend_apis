
import express from 'express'
import { isAuthenticated } from '../middlewares/isAuthenticate.js'
import { createFood , deleteFood, getAllFoods, getFoodById, getFoodByRestaurantId, updateFood} from '../controllers/foodController.js'

const foodRouter = express.Router()

foodRouter.post('/create' , isAuthenticated , createFood)
foodRouter.get('/get-all' , getAllFoods)
foodRouter.get('/get/:id' , getFoodById)
foodRouter.get('/get-by-restaurant/:id' , getFoodByRestaurantId)
foodRouter.put('/update/:id' , isAuthenticated ,updateFood)
foodRouter.delete('/delete/:id' , isAuthenticated , deleteFood)



export default foodRouter