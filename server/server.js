import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './configs/cloudinary.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';
import { stripeWebhooks } from './controllers/orderController.js';

import contactRouter from './routes/contactRoute.js';
import aboutusRouter from './routes/aboutusRoute.js';

const app = express();
const port = process.env.PORT || 4000;

await connectDB()
await connectCloudinary()

// Allow multiple origins
const allowedOrigins = ['http://localhost:5173', 'https://bose-cart.vercel.app']

app.post('/stripe', express.raw({type: 'application/json'}), stripeWebhooks)

//Middleware COnfiguration
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: allowedOrigins, credentials: true}));

app.get('/', (req, res) => res.send("Hello Bose! API is Working"));
app.use('/api/user', userRouter)
app.use('/api/seller', sellerRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/address', addressRouter)
app.use('/api/order', orderRouter)

app.use('/api/contact', contactRouter);
app.use('/api/track', aboutusRouter);



app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`)
})