import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const User = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: { unique: true }
    }
  },
  { timestamps: true }
);

User.plugin(passportLocalMongoose, { usernameField: 'email' });

export default mongoose.model('User', User);
