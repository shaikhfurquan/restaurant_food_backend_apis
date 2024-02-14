
import express from 'express';
import { createCategory, deleteCategory, getAllCategory, getCategoryById, updateCategory } from '../controllers/categoryController.js';
import { isAuthenticated } from '../middlewares/isAuthenticate.js';

const categoryRouter = express.Router();


categoryRouter.post('/create', isAuthenticated , createCategory);
categoryRouter.get('/get-all', getAllCategory);
categoryRouter.get('/get/:id', getCategoryById);
categoryRouter.put('/update/:id', isAuthenticated , updateCategory);
categoryRouter.delete('/delete/:id', isAuthenticated , deleteCategory);



export default categoryRouter
