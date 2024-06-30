import express from 'express';
import index from '@/controllers';
import { registerUser } from '@/controllers/user/registerUser';

const router = express.Router();

router.get('/', index);
router.post('/auth/getAccessToken', registerUser);

export default router;
