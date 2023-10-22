import mongoose from 'mongoose';

const { Schema } = mongoose;

const meetingModel = mongoose.model(
  'Meeting',
  mongoose.Schema(
    {
      hostId: {
        type: String,
        required: true,
      },
      hostName: {
        type: String,
        required: false,
      },
      startTime: {
        type: Date,
        required: true,
      },
      meetingUsers: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'MeetingUser',
        },
      ],
    },
    {
      toJSON: {
        transform: function (doc, ret) {
          ret.id = ret._id.toString();
          delete ret._id;
          delete ret.__v;
        },
      },
    },
    {
      timeStamps: true,
    }
  )
);

export default meetingModel;
