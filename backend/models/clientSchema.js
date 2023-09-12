const mongoose = require("mongoose");
const { Schema } = mongoose;

const clientSchema = new Schema({
  fullname: String,
  nickname: String,
  email: String,
  password: String,
  phone: Number,
  verifiedStatus: String,
  verifiedToken: String,
});

const ClientModel = mongoose.model("client", clientSchema);

exports.default = ClientModel;