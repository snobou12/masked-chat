const RoomModel = require("../models/room-model");
const ApiError = require("../exceptions/api-errors");
const RoomDto = require("../dtos/room-dto");
const ChatModel = require("../models/chat-model");



const roomConversionDto =(room) => {
    const roomDto = new RoomDto(room);
    return roomDto;
};

class RoomService{
    
    async createRoom(title,description,type,ageRestriction,moderator){
        const candidateRoom = await RoomModel.findOne({title});
        if(candidateRoom){
            throw ApiError.BadRequest("Название комнаты уже используется");
        }
        const newRoom = await RoomModel.create({
            title,
            description,
            type,
            ageRestriction,
            moderator
        });

        const lastRoom = await RoomModel.find().limit(1).sort({$natural:-1});
        
         const newChat = await ChatModel.create({
            roomId:lastRoom[0].id,
         })

         const roomDto= new RoomDto(newRoom);
         
         return roomDto

    }
    async deleteRoom(userId,roomId){
        const findedRoom = await RoomModel.findById(roomId);
        if(!findedRoom){
            throw ApiError.BadRequest("Комната не найдена");
        }
        if(findedRoom.moderator!==userId ){
            throw ApiError.BadRequest("Вы не администратор комнаты");
        }
        await RoomModel.deleteOne({id:roomId});
        return {message:"Комната успешно удалена",roomId}

    }


    async getRoomData(userId,roomId){
        const findedRoom = await RoomModel.findById(roomId);
        if(!findedRoom){
            throw ApiError.BadRequest("Комната не найдена");
        }
        if(userId !== findedRoom.moderator){
            if (findedRoom.allowedUsers.includes(userId)){
                return roomConversionDto(findedRoom)  
            }
            throw ApiError.BadRequest("Вы не состоите в комнате")
        }
        return  roomConversionDto(findedRoom)  
    }
    

    async deleteUserFromRoom(userId,roomId,deleteUserId){
        const findedRoom= await RoomModel.findById(roomId);
        if(!findedRoom){
            throw ApiError.BadRequest("Комната не найдена");
        }
        if(findedRoom.moderator !== userId){
            throw ApiError.BadRequest("Вы не администратор комнаты"); 
        }
        if(!findedRoom.allowedUsers.includes(deleteUserId)){
            throw ApiError.BadRequest("Пользователя, которого хотите удалить не существует"); 
        }
        const prevUsers=[...findedRoom.allowedUsers];
        const newUsers = prevUsers.filter(user=>user !== deleteUserId);
        findedRoom.allowedUsers=newUsers;
        await findedRoom.save()
        return {message:"Пользователь успешно удален",deleteUserId}
    }

    async leaveFromRoom(userId,roomId){
        const findedRoom= await RoomModel.findById(roomId);
        if(!findedRoom){
            throw ApiError.BadRequest("Комната не найдена");
        }
        if(!findedRoom.allowedUsers.includes(userId)){
            throw ApiError.BadRequest("Невозможно выйти из комнаты"); 
        }

        const prevUsers=[...findedRoom.allowedUsers];
        const newUsers = prevUsers.filter(user=>user!==userId);
        findedRoom.allowedUsers=newUsers;
        await findedRoom.save();
        return {message:"Вы успешно вышли из комнаты"};

    }

    

    async getRoomsBySort(form_title,form_type,form_age){
        const allRooms = await RoomModel.find();
        if(form_title && form_type && form_age){
            const findedRooms=[];
            for (let i=0;i<allRooms.length;i++){
                
                if(allRooms[i].title.toLowerCase().search(form_title.toLowerCase()) !== -1 && allRooms[i].type.toLowerCase().search(form_type.toLowerCase()) !== -1 && Number(allRooms[i].ageRestriction) >= Number(form_age)){
                    findedRooms.push(roomConversionDto(allRooms[i]));
                }
            }
           
            
            return findedRooms;
        }
        if(form_title && form_type){
            const findedRooms=[];
            for (let i=0;i<allRooms.length;i++){
                
                if(allRooms[i].title.toLowerCase().search(form_title.toLowerCase()) !== -1 && allRooms[i].type.toLowerCase().search(form_type.toLowerCase()) !== -1){
                    findedRooms.push(roomConversionDto(allRooms[i]));
                }
            }
            
            return findedRooms;
        }

        if(form_title && form_age){
            const findedRooms=[];
            for (let i=0;i<allRooms.length;i++){
                
                if(allRooms[i].title.toLowerCase().search(form_title.toLowerCase()) !== -1 && Number(allRooms[i].ageRestriction) >= Number(form_age)){
                    findedRooms.push(roomConversionDto(allRooms[i]));
                }
            }
            
            return findedRooms;
        }

        if(form_type && form_age){
            
            const findedRooms=[];
            for (let i=0;i<allRooms.length;i++){
                
                if(allRooms[i].type.toLowerCase().search(form_type.toLowerCase()) !== -1 && Number(allRooms[i].ageRestriction) >= Number(form_age)){
                    findedRooms.push(roomConversionDto(allRooms[i]));
                }
            }
            
            return findedRooms;
        }
        if(form_title){
            const findedRooms=[];
            for (let i=0;i<allRooms.length;i++){
                if(allRooms[i].title.toLowerCase().search(form_title.toLowerCase()) !== -1){
                    
                    findedRooms.push(roomConversionDto(allRooms[i]));
                }
            }
            
            return findedRooms;
        }
        if(form_type){
            const findedRooms=[];
            for (let i=0;i<allRooms.length;i++){
                if(allRooms[i].type.toLowerCase().search(form_type.toLowerCase()) !== -1){
                    findedRooms.push(roomConversionDto(allRooms[i]));
                }
            }
            
            
            return findedRooms;
            
            
        }
        if(form_age){
            const findedRooms=[];
            for (let i=0;i<allRooms.length;i++){
                
                if(Number(allRooms[i].ageRestriction) >= Number(form_age)){
                    findedRooms.push(roomConversionDto(allRooms[i]));
                }
            }
            return findedRooms;
        }
        const allRoomsDto = [];
        for (let i=0;i<allRooms.length;i++){
            allRoomsDto.push(roomConversionDto(allRooms[i]));
        }
        return allRoomsDto;
    }



    async getRoomsOfUser(userId){
       const allRooms = await RoomModel.find();
       const findedRooms = [];
       for (let i=0;i<allRooms.length;i++){
           if(allRooms[i].moderator === userId || allRooms[i].allowedUsers.includes(userId)){
               findedRooms.push(roomConversionDto(allRooms[i]));
           }
       }
       
       return findedRooms;

    }


    async acceptPotentialUser(userId,roomId,acceptedUserId){
        const findedRoom = await RoomModel.findById(roomId);
        if(!findedRoom){
            throw ApiError.BadRequest("Комната не найдена");
        }
        if(findedRoom.moderator !== userId){
            throw ApiError.BadRequest("Вы не администратор комнаты");
        }
        if(!findedRoom.potentialUsers.includes(acceptedUserId)){
            throw ApiError.BadRequest("Пользователя, которого нужно добавить, не найден");
        }
        const prevPotentialUsers = [...findedRoom.potentialUsers];
        const newPotentialUsers = prevPotentialUsers.filter(user=>user !== acceptedUserId);

        const prevAllowedUsers = [...findedRoom.allowedUsers];
        const newAllowedUsers = [...prevAllowedUsers,acceptedUserId];

        findedRoom.potentialUsers=newPotentialUsers;
        findedRoom.allowedUsers=newAllowedUsers;
        await findedRoom.save();

        return {message:"Пользователь успешно добавлен в комнату",roomId,acceptedUserId}

    }


    async deletePotentialUser(userId,roomId,deleteUserId){

        const findedRoom = await RoomModel.findById(roomId);

        if(!findedRoom){
            throw ApiError.BadRequest("Комната не найдена");
        }
        if(findedRoom.moderator !== userId){
            throw ApiError.BadRequest("Вы не администратор комнаты");
        }
        if(!findedRoom.potentialUsers.includes(deleteUserId)){
            throw ApiError.BadRequest("Пользователя, которого нужно удалить, не найден");
        }

        const prevPotentialUsers = [...findedRoom.potentialUsers];
        const newPontentialUsers = prevPotentialUsers.filter(user=>user!==deleteUserId);

        findedRoom.potentialUsers=newPontentialUsers;
        await findedRoom.save();

        return {message:"Пользователь успешно удален из запроса",roomId,deleteUserId}
        


    }

    async subscribeToRoom(userId,roomId){
       
        const findedRoom = await RoomModel.findById(roomId);

        if(!findedRoom){
            throw ApiError.BadRequest("Комната не найдена");
        }
       
        if(findedRoom.moderator === userId){
            throw ApiError.BadRequest("Вы администратор комнаты");
        }
        if(findedRoom.allowedUsers.includes(userId)){
            throw ApiError.BadRequest("Вы уже состоите в комнате");
        }
        if(findedRoom.potentialUsers.includes(userId)){
            throw ApiError.BadRequest("Вы уже подписаны на комнату");
        }
        const prevPotentialUsers= [...findedRoom.potentialUsers];
        const newPotentialUsers = [...prevPotentialUsers,userId];

        findedRoom.potentialUsers=newPotentialUsers;
        await findedRoom.save();
        return {message:"Вы успешно подписались на комнату",roomId,userId}


    }

    async unSubscribeToRoom(userId,roomId){
       
        const findedRoom = await RoomModel.findById(roomId);

        if(!findedRoom){
            throw ApiError.BadRequest("Комната не найдена");
        }
       
        if(findedRoom.moderator === userId){
            throw ApiError.BadRequest("Вы администратор комнаты");
        }


        if(findedRoom.allowedUsers.includes(userId)){
            throw ApiError.BadRequest("Вы состоите в комнате");
        }

        if(!findedRoom.potentialUsers.includes(userId)){
            throw ApiError.BadRequest("Вы не подписаны на комнату");
        }



        const prevPotentialUsers= [...findedRoom.potentialUsers];
        const newPotentialUsers = prevPotentialUsers.filter(user=>user !== userId);
         findedRoom.potentialUsers=newPotentialUsers;
         await findedRoom.save();
         return {message:"Вы успешно отписались на комнату",roomId,userId}


    }
    

}

module.exports = new RoomService();
