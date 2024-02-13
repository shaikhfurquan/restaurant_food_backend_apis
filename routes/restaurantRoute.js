import express from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticate.js';
import { createRestaurant } from '../controllers/restaurantController.js';

const restaurantRouter = express.Router();


restaurantRouter.post('/create' , isAuthenticated , createRestaurant)


export default restaurantRouter