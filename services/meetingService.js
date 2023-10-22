import meetingModel from '../models/meetingModel.js';
import meetingUserModel from '../models/meetingUserModel.js';

export const getAllMeetingUsersService = async (meetingId, callback) => {
  meetingUserModel
    .find({ meetingId: meetingId })
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      callback(error);
      // console.log(error);
    });
};

// const getAllMeetingUsersAsync = async (meetingId, callback) => {
//   try {
//     const response = await meetingUserModel.find({ meetingId: meetingId });
//     return callback(null, response);
//   } catch (error) {
//     callback(error);
//     console.log(error);
//   }
// };

export const startMeetingService = async (params, callback) => {
  const meetingSchema = new meetingModel(params);
  meetingSchema
    .save()
    .then((response) => {
      return callback(null, response);
    })
    .catch((e) => {
      return callback(e);
    });
};

export const joinMeetingService = async (params, callback) => {
  const meetingUser = new meetingUserModel(params);
  meetingUser
    .save()
    .then(async (response) => {
      await meetingModel.findOneAndUpdate(
        { id: params.meetingId },
        { $addToSet: { meetingUsers: meetingUser } }
      );
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
};

export const isMeetingPresentService = async (meetingId, callback) => {
  meetingModel
    .findById(meetingId)
    .populate('meetingUsers', 'MeetingUser')
    .then((response) => {
      if (!response) callback('Invalid meeting id');
      else callback(null, true);
    })
    .catch((error) => {
      return callback(error, false);
    });
};

export const checkMeetingExistService = async (meetingId, callback) => {
  meetingModel
    .findById(meetingId, 'hostId, hostName, startTime')
    .populate('meetingUsers', 'MeetingUser')
    .then((response) => {
      if (!response) callback('Invalid meeting id');
      else callback(null, response);
    })
    .catch((error) => {
      return callback(error, false);
    });
};

export const getMeetingUserService = async (params, callback) => {
  const { meetingId, userId } = params;
  meetingUserModel
    .find({ meetingId, userId })
    .then((response) => {
      return callback(null, response[0]);
    })
    .catch((error) => {
      return callback(error);
    });
};

export const updateMeetingUserService = async (params, callback) => {
  meetingModel
    .updateOne({ userId: params.userId }, { $set: params }, { new: true })
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
};

export const getUserBySocketIdService = async (params, callback) => {
  const { meetingId, sockedId } = params;
  meetingUserModel
    .find({ meetingId, sockedId })
    .limit(1)
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
};
