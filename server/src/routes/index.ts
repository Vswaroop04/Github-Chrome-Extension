import express from 'express';
import index from '@/controllers';

const router = express.Router();

router.get('/', index);
router.post("/registerUser", )


export default router;