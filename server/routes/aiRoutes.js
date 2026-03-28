import express from 'express';
import multer from 'multer';
import { 
  enhanceProfessionalSummary, 
  enhanceJobDescription,
  uploadResume,
  uploadImage
} from '../controllers/aiController.js';
import protect from '../middlewares/authMiddleware.js';

const aiRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

aiRouter.post('/enhance-pro-sum', protect, enhanceProfessionalSummary);
aiRouter.post('/enhance-job-desc', protect, enhanceJobDescription);

aiRouter.post('/upload-resume', uploadResume);
aiRouter.put('/update-resume/:resumeId', protect, uploadResume);

// 🔥 THIS IS THE KEY FIX
aiRouter.post('/upload-image', upload.single('file'), uploadImage);

export default aiRouter;