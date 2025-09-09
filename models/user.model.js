import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "user name is required"],
    trim: true,
    minLength: 2,
    maxLength: 50,
  },
 
  email: {
    type: String,
    required: [true, "user email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "please fill a valid email address"],

  },
  password: {
    type: String,
    required: [true, "user password is required"],
    trim: true,
    minLength: 6,
  }
  //   timestamps  -a record of date and time when something happens.
}, { timestamps: true });
const User = mongoose.model("user", userSchema);
export default User;