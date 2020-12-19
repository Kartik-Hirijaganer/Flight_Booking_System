const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: String,
    // required: true
  },
  mobileNo:{
    type:Number,
    required:true
  },
  gender:{
    type:String,
    required: true
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  password: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    required: true
  }
});


userSchema.pre('save', async function (next) {
  //console.log('user about to be created', this)
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});




userSchema.statics.login = async function(emailId, password){
  //console.log('inside login');
  const myuser = await this.findOne({emailId: emailId});

  if(myuser){
    const result = await bcrypt.compare(password, myuser.password);
    if(result){
      return myuser;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
}


const user = mongoose.model("user", userSchema);
module.exports = user;





// const userSchema = mongoose.model("user", {
//   firstName: {
//     type: String,
//     required: true
//   },
//   lastName: {
//     type: String,
//     required: true
//   },
//   dateOfBirth: {
//     type: String,
//     required: true
//   },
//   mobileNo:{
//     type:Number,
//     required:true
//   },
//   gender:{
//     type:String,
//     required: true
//   },
//   emailId: {
//     type: String,
//     required: true
//   },
//   password: {
//     type: String,
//     required: true
//   }
//   // bookings:[{ bookingId:Number }]
// });
