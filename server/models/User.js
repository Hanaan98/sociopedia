import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      requrired: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      requrired: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      requrired: true,
      min: 2,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      min: 5,
      required: true,
    },
    profilePicture: {
      type: String,
    },
    friends: {
      type: Array,
      default: [],
    },
    occupation: { type: String },
    location: { type: String },
    views: { type: Number },
    impressions: { type: Number },
  },
  { timestamps: true }
);
const User = mongoose.model("User", UserSchema);
export default User;
