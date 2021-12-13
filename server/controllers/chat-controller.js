const ApiError = require("../exceptions/api-errors");
const chatService = require("../services/chat-service");
class ChatController {

    async getChat(req, res, next) {   
        try {
          const {user}=req;
          const {roomId}=req.body;
          const getChatResponse = await chatService.getChat(user.id,roomId);
          return res.json(getChatResponse);
        } catch (e) {
          next(e);
        }
      }
      
    async sendMessage(req,res,next){

      try{
        const {user}=req;
        const {roomId,message}=req.body;
        const sendMessageResponse = await chatService.sendMessage(user.id,roomId,message);
        return res.json(sendMessageResponse)
      }
      catch(e){
        next(e)
      }
    }

  }

module.exports = new ChatController();
