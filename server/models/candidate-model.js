const { Schema, model } = require('mongoose');
const CandidateSchema = new Schema({
  phone:{ type: String, unique: true, required: true },
  code:{type:String,unique:false,required:true},
  isActivated:{type:Boolean,unique:false,required:true,default:false},
});

module.exports = model('Candidate', CandidateSchema);
