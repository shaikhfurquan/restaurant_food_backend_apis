
import expres  from "express";
import { isAuthenticated } from "../middlewares/isAuthenticate.js";
import { changeOrderStatus, placeOrder } from "../controllers/orderController.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

const orderRouter = expres.Router()

orderRouter.post('/place-order' , isAuthenticated , placeOrder)
orderRouter.post('/order-status/:id' , isAuthenticated , adminMiddleware , changeOrderStatus)


 export default orderRouter