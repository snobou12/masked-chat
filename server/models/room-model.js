
const { Schema, model } = require("mongoose");




const RoomSchema = new Schema(
  {
    title: { type: String, unique: true, required: true },
    description: { type: String, unique: false, required: true },
    type: { type: String, unique: false, required: true },
    ageRestriction: { type: String, unique: false, required: true },
    moderator: { type: String, unique: false, required: true },
    allowedUsers: [String],
    potentialUsers:[String],

    
  },
  {
    timestamps: true,
  }
);

module.exports = model("Room", RoomSchema);
