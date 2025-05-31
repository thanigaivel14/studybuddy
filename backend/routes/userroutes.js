import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { getUserProfile,userupdate,uploadavatar,deleteavatar ,updateavatar} from '../controller/userController.js';
import  {upload} from "../middleware/uploadmiddleware.js"

const router=express.Router();
router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile/update',authMiddleware,userupdate);
router.post('/profile/upload-avatar',authMiddleware,upload.single('avatar'),uploadavatar)
router.post('/profile/delete-avatar',authMiddleware,deleteavatar)   
router.put('/profile/update-avatar',authMiddleware,upload.single('avatar'),updateavatar)
export default router;