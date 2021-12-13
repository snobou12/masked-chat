


export interface IRoom {
    id: string;
    title: string;
    description: string;
    type: string;
    ageRestriction: string;
    moderator: string;
    allowedUsers: string[];
    potentialUsers: string[];
    createdAt:string;
    updatedAt:string
  }