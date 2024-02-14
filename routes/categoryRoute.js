
import express from 'express';
import { createCategory, getAllCategory } from '../controllers/categoryController.js';
import { isAuthenticated } from '../middlewares/isAuthenticate.js';

const categoryRouter = express.Router();


categoryRouter.post('/create', isAuthenticated , createCategory);
categoryRouter.get('/get-all', getAllCategory);



export default categoryRouter