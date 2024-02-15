
import expres  from "express";
import { isAuthenticated } from "../middlewares/isAuthenticate.js";
import { placeOrder } from "../controllers/orderController.js";

const orderRouter = expres.Router()

orderRouter.post('/place-order' , isAuthenticated , placeOrder)


 export default orderRouter