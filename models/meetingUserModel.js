import mongoose from 'mongoose';

const { Schema } = mongoose;

const meetingUserModel = mongoose.model(
  'MeetingUser',
  mongoose.Schema(
    {
      socketId: {
        type: String,
      },
      meetingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Meeting',
      },
      userId: {
        type: String,
        required: true,
      },
      joined: {
        type: Boolean,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      isAlive: {
        type: Boolean,
        required: true,
      },
    },
    {
      timeStamps: true,
    }
  )
);

export default meetingUserModel;
