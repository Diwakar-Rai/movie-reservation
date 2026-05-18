import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();
router.use('/auth', authRoutes);
export default router;
// router.get("/me", authenticate, (req, res)=>{res.json({success:true, user:req.user})})
