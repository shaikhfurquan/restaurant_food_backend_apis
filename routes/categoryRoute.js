
import express from 'express';
import { createCategory, getAllCategory, getCategoryById, updateCategory } from '../controllers/categoryController.js';
import { isAuthenticated } from '../middlewares/isAuthenticate.js';

const categoryRouter = express.Router();


categoryRouter.post('/create', isAuthenticated , createCategory);
categoryRouter.get('/get-all', getAllCategory);
categoryRouter.get('/get/:id', getCategoryById);
categoryRouter.put('/update/:id', isAuthenticated , updateCategory);



export default categoryRouter
