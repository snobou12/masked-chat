
export interface IMessage{
    message:string;
    userSenderId:string;
    createdAt:string;
    _id:string;
}

export interface IChat {
    id: string;
    messages:IMessage[],
    roomId:string;
  }