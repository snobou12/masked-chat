const RoomModel = require("../models/room-model");
const ApiError = require("../exceptions/api-errors");
const ChatDto = require("../dtos/chat-dto");
const ChatModel = require("../models/chat-model");

class ChatService{
    async getChat(userId,roomId){
        

        const findedRoom= await RoomModel.findById(roomId);
       
        if(!findedRoom){
            throw ApiError.BadRequest("Комната не найдена");
        }
        
        if(findedRoom.allowedUsers.includes(userId) || findedRoom.moderator == userId ){
            const findedChat = await ChatModel.findOne({roomId});
            if(!findedChat){
                throw ApiError.BadRequest("Что-то пошло не так");
            }
            const findedChatDto = new ChatDto(findedChat);
            return findedChatDto
        }
        else{
            throw ApiError.BadRequest("Вы не состоите в комнате");
        }


    }

    async sendMessage(userId,roomId,message){
        const findedRoom= await RoomModel.findById(roomId);
        if(!findedRoom){
            throw ApiError.BadRequest("Комната не найдена");
        }

        if(findedRoom.allowedUsers.includes(userId) || findedRoom.moderator == userId ){
            const findedChat = await ChatModel.findOne({roomId});
            if(!findedChat){
                throw ApiError.BadRequest("Что-то пошло не так");
            }
            
            const prevMessages = findedChat.messages;
            const newMessages=[...prevMessages,{message,userSenderId:userId,createdAt:new Date().toLocaleString()}];
            findedChat.messages=newMessages;
            await findedChat.save();
            const findedChatDto = new ChatDto(findedChat)
            return findedChat
            
        }
        else{
            throw ApiError.BadRequest("Вы не состоите в комнате");
        }

    }

}

module.exports = new ChatService();

