import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './db/connectDB.js';
import userRouter from './routes/userRoute.js';
import restaurantRouter from './routes/restaurantRoute.js';
import categoryRouter from './routes/categoryRoute.js';
import foodRouter from './routes/foodRoute.js';
import orderRouter from './routes/orderRoute.js';


dotenv.config()

const app = express();


//express middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'))


//routes
app.use('/api/user' , userRouter)
app.use('/api/restaurant' , restaurantRouter)
app.use('/api/category' , categoryRouter)
app.use('/api/food' , foodRouter)
app.use('/api/order' , orderRouter)

//db connection
connectDB()

app.listen(process.env.PORT, () => {
    console.log(`Serving running on port ${process.env.PORT}`);
})