import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  bio: String,
  image: String,
  communities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Community" }],
  threads: [{ type: mongoose.Schema.Types.ObjectId, ref: "Thread" }],
  followedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  likedThread: [{ type: mongoose.Schema.Types.ObjectId, ref: "Thread" }],
  onboarded: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
