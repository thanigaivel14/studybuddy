import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import {postCreate,allpost,getsinglepost,updatepost,deletepost,togglelike,addComment,getMyPosts ,updateComment,deleteComment} from "../controller/postcontroller.js"
const router = express.Router();

router.get('/dashboard', authMiddleware, (req, res) => {
  res.json({ message: `Hello user with ID ${req.id}, this is your dashboard!` });
});
// add post
router.post('/post',authMiddleware,postCreate);
router.get('/getallpost',allpost)
router.get('/getsinglepost/:id',getsinglepost)
router.put('/updatepost/:id',authMiddleware,updatepost)
// DELETE /api/private/deletepost/:id
router.delete('/deletepost/:id',authMiddleware, deletepost);
// routes/postRoutes.js
router.put('/like/:id', authMiddleware, togglelike);
router.post('/comment/:id', authMiddleware, addComment);
router.get('/myposts', authMiddleware, getMyPosts);
router.get('/update-comment', authMiddleware, updateComment);
router.get('/delete-comment', authMiddleware, deleteComment);


export default router;
