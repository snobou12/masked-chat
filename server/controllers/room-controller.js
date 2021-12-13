
const ApiError = require("../exceptions/api-errors");
const roomService = require("../services/room-service");
class RoomController {
  async createRoom(req, res, next) {
    try {
      const { title, description, type, ageRestriction } = req.body;
      const {user}=req;
      const moderator=user.id;
      
       const newRoom = await roomService.createRoom(
         title,
         description,
         type,
         ageRestriction,
         moderator
       );

      return res.json({message:"Комната успешно создана",room:newRoom});
    } catch (e) {
      next(e);
    }
  }

  async deleteRoom(req,res,next){
    try{
      const {user}=req;
      const {roomId} = req.body;
      const deleteResponse= await roomService.deleteRoom(user.id,roomId);
      return res.json(deleteResponse);
    }
    catch(e){
      next(e)
    }
  }


  async getRoomsBySort(req,res,next){
    try{
      const {form_title,form_type,form_age}=req.body;
      const findedRooms= await roomService.getRoomsBySort(form_title,form_type,form_age);
      return res.json(findedRooms);
    }
    catch(e){
      next(e)
    }
  }

  async getRoomData(req,res,next){
    try{
      const {user}=req;
      const {roomId}=req.params;
      const roomData = await roomService.getRoomData(user.id,roomId);
      return res.json(roomData);
    }
    catch(e){
      next(e);
    }
  }

  async deleteUserFromRoom(req,res,next){
    try{
      const {user}=req;
      const {roomId,deleteUserId}=req.body;
      const deleteUserResponse = await roomService.deleteUserFromRoom(user.id,roomId,deleteUserId);
      return res.json(deleteUserResponse)
    }
    catch(e){ 
      next(e);
    }
  }

  async leaveFromRoom(req,res,next){
    try{
      const {user}=req;
      const {roomId}=req.body;
      const leaveFromRoomResponse = await roomService.leaveFromRoom(user.id,roomId);
      return res.json(leaveFromRoomResponse);
    }
    catch(e){
      next(e);
    }
  }

  async getRoomsOfUser(req,res,next){
    try{
      const {user}=req;
      const findedRooms = await roomService.getRoomsOfUser(user.id);
      return res.json(findedRooms);

    }
    catch(e){
      next(e);
    }
  }

  async subscribeToRoom(req,res,next){
    try{
      const {user}=req;
      const {roomId}=req.body;
      const subscribeResponse=await roomService.subscribeToRoom(user.id,roomId);
      return res.json(subscribeResponse)
    }
    catch(e){
      next(e);
    }
  }

  async unSubscribeToRoom(req,res,next){
    try{
      const {user}=req;
      const {roomId}=req.body;
      const unSubscribeResponse=await roomService.unSubscribeToRoom(user.id,roomId);
      return res.json(unSubscribeResponse)
    }
    catch(e){
      next(e);
    }
  }

  async acceptPotentialUser(req,res,next){
    try{
      const {user}=req;
      const {roomId,acceptedUserId}=req.body;
      const acceptPotentialUserResponse = await roomService.acceptPotentialUser(user.id,roomId,acceptedUserId);
      return res.json(acceptPotentialUserResponse);
    }
    catch(e){
      next(e);
    }

  }

    async deletePotentialUser(req,res,next){
      try{
        const {user}=req;
        const {roomId,deleteUserId}=req.body;
        const deletePotentialUserResponse = await roomService.deletePotentialUser(user.id,roomId,deleteUserId);
        return res.json(deletePotentialUserResponse);
      }
      catch(e){
        next(e);
      }
    }

  
}
module.exports = new RoomController();
