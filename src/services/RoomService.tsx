
import $api from "../api";
import { AxiosResponse } from "axios";

export default class RoomService {
  
  static async createRoom(title: string, description: string,type:string,ageRestriction:string): Promise<AxiosResponse> {
    return $api.post("/createRoom", { title, description,type,ageRestriction });
  }

  static async getRoomData(roomId:string): Promise<AxiosResponse> {
    return $api.get(`/getRoomData/${roomId}`);
  }
 
  static async deleteUserFromRoom(roomId:string,deleteUserId:string): Promise<AxiosResponse> {
    return $api.post("/deleteUserFromRoom", { roomId,deleteUserId });
  }

  static async leaveFromRoom(roomId:string): Promise<AxiosResponse> {
    return $api.post("/leaveFromRoom", { roomId });
  }

  static async getRoomsOfUser(): Promise<AxiosResponse> {
    return $api.get("/getRoomsOfUser");
  }


  static async acceptPotentialUser(roomId:string,acceptedUserId:string): Promise<AxiosResponse> {
    return $api.post("/acceptPotentialUser",{roomId,acceptedUserId});
  }

  static async deletePotentialUser(roomId:string,deleteUserId:string): Promise<AxiosResponse> {
    return $api.post("/deletePotentialUser",{roomId,deleteUserId});
  }

  
  
  
  

  
  
}
