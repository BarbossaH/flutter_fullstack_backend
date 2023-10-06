import express from 'express';

import {
  registerController,
  signInController,
} from '../controller/authController.js';
const router = express.Router();

router.post('/signup', registerController);
router.post('/signin', signInController);

// router.get('/users', (req, res) => {
//   res.json({ hi: 'hello world' });
// });

export default router;
