import mongoose from 'mongoose';

const File = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      required: true
    },
    fileType: {
      type: Number
    },
    name: String,
    fileBuffer: Buffer
  },
  { timestamps: true }
);

export default mongoose.model('File', File);
