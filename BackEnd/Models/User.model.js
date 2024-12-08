import mongoose from "mongoose";
// User Schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 30,
      trim:true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 50,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
