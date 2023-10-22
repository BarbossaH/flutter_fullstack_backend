import express from 'express';
import {
  checkMeetingExistController,
  getAllMeetingUsersController,
  startMeetingController,
} from '../controller/meetingController.js';
const router = express.Router();

router.post('/meeting/start', startMeetingController);
router.get('meeting/join', checkMeetingExistController);
router.get('meeting/get', getAllMeetingUsersController);

export default router;
