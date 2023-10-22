import {
  getAllMeetingUsersService,
  getMeetingUserService,
  isMeetingPresentService,
  joinMeetingService,
  updateMeetingUserService,
} from '../services/meetingService.js';
import { MeetingPayloadEnum } from './meetingPayloadEnum.js';

export const joinMeetingHelper = async (
  meetingId,
  socket,
  meetingServer,
  payload
) => {
  const { userId, name } = payload.data;
  isMeetingPresentService(meetingId, async (error, result) => {
    if (error && !result) {
      _sendMessage(socket, {
        type: MeetingPayloadEnum.NOT_FOUND,
      });
    }
    if (result) {
      _addUser(socket, { meetingId, userId, name }).then(
        (result) => {
          if (result) {
            _sendMessage(socket, {
              type: MeetingPayloadEnum.JOINED_MEETING,
              data: {
                userId,
              },
            });
            _broadcastUsers(meetingId, socket, meetingServer, {
              type: MeetingPayloadEnum.USER_JOINED,
              data: { userId, name, ...payload.data },
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  });
};

export const forwardConnectionRequestHelper = (
  meetingId,
  socket,
  meetingServer,
  payload
) => {
  const { userId, otherUserId, name } = payload.data;
  var model = {
    meetingId,
    userId: otherUserId,
  };
  getMeetingUserService(model, (error, result) => {
    if (result) {
      var sendPayload = JSON.stringify({
        type: MeetingPayloadEnum.CONNECTION_REQUEST,
        data: {
          userId,
          name,
          ...payload.data,
        },
      });
      meetingServer.to(result.socketId).emit('message', sendPayload);
    }
  });
};
export const forwardIceCandidateHelper = (
  meetingId,
  socket,
  meetingServer,
  payload
) => {
  const { userId, otherUserId, candidate } = payload.data;
  var model = {
    meetingId,
    userId: otherUserId,
  };
  getMeetingUserService(model, (error, result) => {
    if (result) {
      var sendPayload = JSON.stringify({
        type: MeetingPayloadEnum.ICECANDIDATE,
        data: {
          userId,
          candidate,
        },
      });
      meetingServer.to(result.socketId).emit('message', sendPayload);
    }
  });
};

export const forwardOfferSDHelper = (
  meetingId,
  socket,
  meetingServer,
  payload
) => {
  const { userId, otherUserId, sdp } = payload.data;
  var model = {
    meetingId,
    userId: otherUserId,
  };
  getMeetingUserService(model, (error, result) => {
    if (result) {
      var sendPayload = JSON.stringify({
        type: MeetingPayloadEnum.OFFER_SDP,
        data: {
          userId,
          sdp,
        },
      });
      meetingServer.to(result.socketId).emit('message', sendPayload);
    }
  });
};

export const forwardAnswerSDPHelper = (
  meetingId,
  socket,
  meetingServer,
  payload
) => {
  const { userId, otherUserId, sdp } = payload.data;
  var model = {
    meetingId,
    userId: otherUserId,
  };
  getMeetingUserService(model, (error, result) => {
    if (result) {
      var sendPayload = JSON.stringify({
        type: MeetingPayloadEnum.ANSWER_SDP,
        data: {
          userId,
          sdp,
        },
      });
      meetingServer.to(result.socketId).emit('message', sendPayload);
    }
  });
};

export const userLeftHelper = (meetingId, socket, meetingServer, payload) => {
  const { userId } = payload.data;
  _broadcastUsers(meetingId, socket, meetingServer, {
    type: MeetingPayloadEnum.USER_LEFT,
    data: {
      userId,
    },
  });
};

export const endMeetingHelper = (meetingId, socket, meetingServer, payload) => {
  const { userId } = payload.data;
  _broadcastUsers(meetingId, socket, meetingServer, {
    type: MeetingPayloadEnum.MEETING_ENDED,
    data: {
      userId,
    },
  });
  getAllMeetingUsersService(meetingId, (error, result) => {
    for (let i = 0; i < result.length; i++) {
      const meetingUser = result[i];
      meetingServer.sockets.connected[meetingUser.socketId].disconnect();
    }
  });
};

export const forwardEventHelper = (
  meetingId,
  socket,
  meetingServer,
  payload
) => {
  const { userId } = payload.data;
  _broadcastUsers(meetingId, socket, meetingServer, {
    type: payload.type,
    data: {
      userId,
      ...payload.data,
    },
  });
};

function _addUser(socket, { meetingId, userId, name }) {
  let promise = new Promise(function (resolve, reject) {
    getMeetingUserService({ meetingId, userId }, (error, result) => {
      if (!result) {
        var model = {
          socketId: socket.id,
          meetingId,
          userId,
          joined: true,
          name,
          isAlive: true,
        };
        joinMeetingService(model, (error, result) => {
          if (result) {
            resolve(true);
          }
          if (error) {
            reject(error);
          }
        });
      } else {
        updateMeetingUserService(
          { userId, socketId: socket.id },
          (error, result) => {
            if (result) {
              resolve(true);
            }
            if (error) {
              reject(error);
            }
          }
        );
      }
    });
  });

  return promise;
}

function _sendMessage(socket, payload) {
  socket.send(JSON.stringify(payload));
}

function _broadcastUsers(meetingId, socket, meetingServer, payload) {
  socket.broadcast.emit('message', JSON.stringify(payload));
}
