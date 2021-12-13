
const { Schema, model } = require("mongoose");






const chatSchema = new Schema(
  {
    roomId:{type:Schema.Types.ObjectId,ref:"Room",unique:true},
    messages:[
      {message:String,userSenderId:String,createdAt:String, }
    ]
  }
);


module.exports = model("Chat", chatSchema);
