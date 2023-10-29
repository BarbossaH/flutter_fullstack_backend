import {
  checkMeetingExistService,
  getAllMeetingUsersService,
  startMeetingService,
} from '../services/meetingService.js';

export const startMeetingController = async (req, res, next) => {
  console.log(123);
  const { hostId, hostName } = req.body;
  var model = {
    hostId: hostId,
    hostName: hostName,
    startTime: Date.now(),
  };
  // const meetingSchema = new meetingModel(model);
  // const response = await meetingSchema.save();

  // return res.status(200).send({
  //   message: success,
  //   data: response.id,
  // });

  startMeetingService(model, (error, result) => {
    if (error) {
      return next(error);
    }
    // console.log(result.id, 999);
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
