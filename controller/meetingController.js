import {
  checkMeetingExistService,
  getAllMeetingUsersService,
  startMeetingService,
} from '../services/meetingService.js';

export const startMeetingController = (req, res, next) => {
  const { hostId, hostName } = req.body;

  var model = {
    hostId: hostId,
    hostName: hostName,
    startTime: Date.now(),
  };
  startMeetingService(model, (error, result) => {
    if (error) {
      return next(error);
    }
    return res.status(200).send({
      message: 'Success',
      data: result.id,
    });
  });
};

export const checkMeetingExistController = (req, res, next) => {
  const { meetingId } = req.query;
  checkMeetingExistService(meetingId, (error, result) => {
    if (error) {
      return next(error);
    }
    return res.status(200).send({
      message: 'Success',
      data: result,
    });
  });
};

export const getAllMeetingUsersController = (req, res, next) => {
  const { meetingId } = req.query;
  getAllMeetingUsersService(meetingId, (error, result) => {
    if (error) {
      return next(error);
    }
    return res.status(200).send({
      message: 'Success',
      data: result,
    });
  });
};
