import express from 'express';
import index from '@/controllers';
import { registerUser } from '@/controllers/user/registerUser';
import { subscribeRepo } from '@/controllers/user/subscribeRepo';

const router = express.Router();

router.get('/', index);
router.post('/auth/getAccessToken', registerUser);
router.post('/subscribeRepo', subscribeRepo);

export default router;
