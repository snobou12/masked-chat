
const { Schema, model } = require("mongoose");
const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, unique: false, required: true },
  firstname: { type: String, unique: false, required: true },
  lastname: { type: String, unique: false, required: true },
  age: { type: String, unique: false, required: true },
  gender: { type: String, unique: false, required: true },
  phone: { type: String, unique: true, required: true },
  isActivatedEmail: { type: Boolean, default: false },
  activationLink: { type: String },
  resetPasswordToken: { type: String, default: "" },
  resetPasswordExpires: { type: String, default: "" },
});

module.exports = model("User", userSchema);
