import express from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticate.js';
import { createRestaurant, deleteRestaurantById, getAllRestaurants, getRestaurantById, updateRestaurantById } from '../controllers/restaurantController.js';

const restaurantRouter = express.Router();


restaurantRouter.post('/create' , isAuthenticated , createRestaurant)
restaurantRouter.get('/get-all' , getAllRestaurants)
restaurantRouter.get('/get/:id' , getRestaurantById)
restaurantRouter.delete('/delete/:id' , isAuthenticated , deleteRestaurantById)
restaurantRouter.put('/update/:id' , isAuthenticated , updateRestaurantById)


export default restaurantRouter