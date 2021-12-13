module.exports = class RoomDto {
    // трансфер между подсистемами в которой нет никакого поведения // чтобы убрать ненужную информацию,достать нужную
    id;
    title;
    description;
    type;
    ageRestriction;
    moderator;
    allowedUsers;
    potentialUsers;
    createdAt;
    updatedAt;

    
    constructor(model) {
      
      this.id = model._id;

      this.title = model.title;

      this.description = model.description;

      this.type = model.type;

      this.ageRestriction = model.ageRestriction;

      this.moderator = model.moderator;

      this.allowedUsers = model.allowedUsers;
      this.potentialUsers=model.potentialUsers;

      this.createdAt = model.createdAt;

      this.updatedAt = model.updatedAt;
    }
  };
  