import express from 'express'
import {enhancejobDescription, enhanceProfessionalSummary, uplaodresume} from '../controllers/aiController.js'
import protect from '../middleware/auth.js'
const aiRouter = express.Router();

aiRouter.post('/enhance-pro-sum',protect,enhanceProfessionalSummary)
aiRouter.post('/enhance-job-desc',protect,enhancejobDescription)
aiRouter.post('/upload-resume',protect,uplaodresume)

export default aiRouter