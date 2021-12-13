
import $api from "../api";
import { AxiosResponse } from "axios";
export default class RoomsService {
  
  static async getRoomsBySort(form_title:string,form_type:string,form_age:string):Promise<AxiosResponse>{
    return $api.post("/getRoomsBySort", { form_title, form_type,form_age });
  }
  static async deleteRoom(roomId: string): Promise<AxiosResponse> {
    return $api.post("/deleteRoom", { roomId});
  }

  static async subscribeToRoom(roomId:string): Promise<AxiosResponse> {
    return $api.post("/subscribeToRoom",{roomId});
  }
  static async unSubscribeToRoom(roomId:string): Promise<AxiosResponse> {
    return $api.post("/unSubscribeToRoom",{roomId});
  }
  
}
