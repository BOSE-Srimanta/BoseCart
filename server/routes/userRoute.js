import express from 'express';
import { isAuth, login, logout, registrer } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';

const userRoute = express.Router();

userRoute.post('/register', registrer)
userRoute.post('/login', login)
userRoute.post('/is-auth', authUser, isAuth)
userRoute.post('/logout', authUser, logout)

export default userRoute