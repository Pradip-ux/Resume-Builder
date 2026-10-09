import express from 'express'
import protect from '../middleware/auth.js';
import { createresume, getPublicResumeById, updateResume, getResumeById,deleteresume } from '../controllers/resumeController.js'
import uplaod from '../config/multer.js';

const resumeRouter = express.Router();

resumeRouter.post('/create', protect, createresume)
resumeRouter.put('/update', uplaod.single('image'), protect, updateResume)
resumeRouter.delete('/delete/:resumeId', protect, deleteresume)
resumeRouter.get('/get/:resumeId', protect, getResumeById)
// resumeRouter.post('/public/:resumeId', protect, getPublicResumeById)
resumeRouter.get('/public/:resumeId', getPublicResumeById)

export default resumeRouter;