import {
  endMeetingHelper,
  forwardAnswerSDPHelper,
  forwardConnectionRequestHelper,
  forwardEventHelper,
  forwardIceCandidateHelper,
  forwardOfferSDHelper,
  joinMeetingHelper,
  userLeftHelper,
} from './utils/meetingHelper.js';
import { MeetingPayloadEnum } from './utils/meetingPayloadEnum.js';

const parseMessage = (message) => {
  try {
    const payload = JSON.parse(message);
    return payload;
  } catch (error) {
    return { type: MeetingPayloadEnum.UNKNOWN };
  }
};

const listenMessage = (meetingId, socket, message, meetingServer) => {
  socket.on('message', (message) =>
    handMessage(meetingId, socket, meetingServer)
  );
};

const handMessage = (meetingId, socket, message, meetingServer) => {
  var payload = '';
  if (typeof message === 'string') {
    payload = parseMessage(message);
  } else {
    payload = message;
  }

  switch (payload.type) {
    case MeetingPayloadEnum.JOIN_MEETING:
      joinMeetingHelper(meetingId, socket, meetingServer, payload);
      break;
    case MeetingPayloadEnum.CONNECTION_REQUEST:
      forwardConnectionRequestHelper(meetingId, socket, meetingServer, payload);
      break;
    case MeetingPayloadEnum.OFFER_SDP:
      forwardOfferSDHelper(meetingId, socket, meetingServer, payload);
      break;
    case MeetingPayloadEnum.ICECANDIDATE:
      forwardIceCandidateHelper(meetingId, socket, meetingServer, payload);
      break;
    case MeetingPayloadEnum.ANSWER_SDP:
      forwardAnswerSDPHelper(meetingId, socket, meetingServer, payload);
      break;
    case MeetingPayloadEnum.LEAVE_MEETING:
      userLeftHelper(meetingId, socket, meetingServer, payload);
      break;
    case MeetingPayloadEnum.END_MEETING:
      endMeetingHelper(meetingId, socket, meetingServer, payload);
      break;
    case MeetingPayloadEnum.VIDEO_TOGGLE:
    case MeetingPayloadEnum.AUDIO_TOGGLE:
      forwardEventHelper(meetingId, socket, meetingServer, payload);
      break;
    case MeetingPayloadEnum.UNKNOWN:
      break;
    default:
      break;
  }
};

import { Server } from 'socket.io';

export const initMeetingServer = (server) => {
  const meetingServer = new Server(server);
  meetingServer.on('connect', (socket) => {
    const meetingId = socket.handshake.query.id;
    listenMessage(meetingId, socket, meetingServer);
  });
};
