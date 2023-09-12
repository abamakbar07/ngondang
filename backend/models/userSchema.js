const mongoose = require("mongoose")
const { Schema } = mongoose;

const userSchema = new Schema({
  fullname: String,
  nickname: String,
  email: String,
  password: String,
  phone: Number,
  verifiedStatus: {
    type: Boolean,
    default: 0
  },
  verifiedToken: String,
  createdAt: {
    type: Date,
    default: new Date()
  }
});

const UserModel = mongoose.model("user", userSchema);

exports.default = UserModel;