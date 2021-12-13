module.exports = class UserDto {
  // трансфер между подсистемами в которой нет никакого поведения // чтобы убрать ненужную информацию,достать нужную
  email;
  id;
  firstname;
  lastname;
  age;
  gender;
  phone;
  isActivatedEmail;
  
  
  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.firstname = model.firstname;
    this.lastname = model.lastname;
    this.age = model.age;
    this.gender = model.gender;
    this.phone = model.phone;
    this.isActivatedEmail = model.isActivatedEmail;
  }
};
