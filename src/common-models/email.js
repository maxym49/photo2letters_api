import mongoose from 'mongoose';

const Email = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      required: true
    },
    value: String,
    selectedFiles: {
      type: [String]
    }
  },
  { timestamps: true }
);

export default mongoose.model('Email', Email);
