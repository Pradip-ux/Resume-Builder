import express from 'express'
import { getUserById, getUserResumes, login, SignUp } from '../controllers/userController.js';
import protect from '../middleware/auth.js';
const userRouter = express.Router();

userRouter.post('/register',SignUp);
userRouter.post('/login',login);
userRouter.get('/data',protect,getUserById);
userRouter.get('/resumes',protect,getUserResumes)
export default userRouter