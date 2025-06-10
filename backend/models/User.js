import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hash: String,
  salt: String,
  token: String,
  avatar: {
    type: Object,
    default: {},
  },
});

const User = mongoose.model("User", userSchema);
export default User;

