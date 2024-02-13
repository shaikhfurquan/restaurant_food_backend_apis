
import express from 'express';
import { createCategory } from '../controllers/categoryController.js';
import { isAuthenticated } from '../middlewares/isAuthenticate.js';

const categoryRouter = express.Router();


categoryRouter.post('/create', isAuthenticated , createCategory);



export default categoryRouter