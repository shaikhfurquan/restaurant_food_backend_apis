import express from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticate.js';
import { createRestaurant, getAllRestaurants, getRestaurantById } from '../controllers/restaurantController.js';

const restaurantRouter = express.Router();


restaurantRouter.post('/create' , isAuthenticated , createRestaurant)
restaurantRouter.get('/get-all' , getAllRestaurants)
restaurantRouter.get('/get/:id' , getRestaurantById)


export default restaurantRouter