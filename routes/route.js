import express from 'express';
import { singupUser, loginUser, logoutUser} from '../controller/usercontroller.js'
import { getImage, uploadImage } from '../controller/imagecontroller.js'
import upload from '../utils/upload.js'
import { createPost, getAllPosts, getPostById, updatePost, deletePost} from '../controller/postcontroller.js';
import { authenticateToken, createNewToken} from '../controller/jwtcontroller.js';
const router = express.Router();

router.post('/signup', singupUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser);
router.post('/file/upload', upload.single('file'), uploadImage);
router.get('/file/:filename', getImage)
router.post('/create', authenticateToken, createPost);
router.get('/posts', authenticateToken, getAllPosts)
router.get('/post/:id', authenticateToken, getPostById)
router.put('/update/:id', authenticateToken, updatePost)
router.delete('/delete/:id', authenticateToken, deletePost);
router.post('/token', createNewToken);
export default router