import express from 'express';
import {
  checkMeetingExistController,
  getAllMeetingUsersController,
  startMeetingController,
} from '../controller/meetingController.js';
const router = express.Router();

router.post('/start', startMeetingController);
router.get('/join', checkMeetingExistController);
router.get('/get', getAllMeetingUsersController);

export default router;
