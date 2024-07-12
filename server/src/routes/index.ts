import express from 'express';
import index from '@/controllers';
import { registerUser } from '@/controllers/user/registerUser';
import { subscribeRepo } from '@/controllers/user/subscribeRepo';
import { createWebHook } from '@/controllers/webhook/createWebhook';

const router = express.Router();

router.get('/', index);
router.post('/auth/getAccessToken', registerUser);
router.post('/subscribeRepo', subscribeRepo);
router.post('/createWebhook', createWebHook);


export default router;
