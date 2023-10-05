import express from 'express';

import { registerController } from '../controller/authController.js';
const router = express.Router();

router.post('/signup', registerController);

// router.get('/users', (req, res) => {
//   res.json({ hi: 'hello world' });
// });

export default router;
