module.exports = class ChatDto {
    id;
    roomId;
    messages;
    
    
    
    constructor(model) {
     
      this.id = model._id;
      this.roomId=model.roomId;
      this.messages=model.messages;
     
    }
  };
  