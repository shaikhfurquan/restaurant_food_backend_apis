import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './db/connectDB.js';

dotenv.config()

const app = express();

//express middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'))


//db connection
connectDB()

app.listen(process.env.PORT, () => {
    console.log(`Serving running on port ${process.env.PORT}`);
})