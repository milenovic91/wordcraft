import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {type: String, unique: true},
  password: String,
  email: {type: String, match: /.+@.+/},
  bio: String,
  image: String
});

export default mongoose.model('User', UserSchema);
