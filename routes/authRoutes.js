import express from 'express';

import {
  registerController,
  signInController,
  tokenCheckController,
  getUserDataController,
} from '../controller/authController.js';
import { authTokenCheck } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/signUp', registerController);
router.post('/signIn', signInController);
router.post('/tokenCheck', tokenCheckController);
router.get('/getUserData', authTokenCheck, getUserDataController);

// router.get('/users', (req, res) => {
//   res.json({ hi: 'hello world' });
// });

export default router;
