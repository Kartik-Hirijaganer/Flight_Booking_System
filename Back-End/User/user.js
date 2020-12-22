const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const auth = require('./auth');
const sms = require('./sms');

//middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
const mongoose = require('mongoose');

const user = require('./userDataModel');

mongoose.connect('mongodb+srv://Kartik:password@cluster0.nvlfp.mongodb.net/user_project?retryWrites=true&w=majority', ()=>{
  console.log('Database connected');
});


//LOGIN POST METHOD
app.post('/user/login', async (req, res) => {
  const {emailId, password} = req.body;

  try{
    const myuser = await user.login(emailId, password);
    const token = auth.createToken(myuser._id);
    var tokenObj = {
      token: token,
      userId: myuser._id,
      userType: myuser.userType
    }
    //res.status(200).json({token: token,userId: myuser._id, userType: myuser.userType});
    res.status(200).send(tokenObj);
    console.log('success');
  }
  catch (err) {
    const error = auth.handleErrors(err);
    res.status(400).send(error);
    console.log(error);
  }
});



//SIGNUP POST METHOD
const maxAge = auth.maxAge;
app.post('/user/signUp', async (req, res)=>{
 
  var newUserObj = {
    firstName:req.body.firstName.toLowerCase(),
    lastName:req.body.lastName.toLowerCase(),
    dateOfBirth:req.body.dateOfBirth,
    mobileNo:req.body.mobileNo,
    gender:req.body.gender.toLowerCase(),
    emailId:req.body.emailId,
    password:req.body.password,
    userType:"user"
  }
  
  var user1 = new user(newUserObj);

  try{
    const newUser = await user.create(user1);
    const token = auth.createToken(newUser._id);
    //res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000});
    res.status(200).json({token: token, userId: newUser._id, userType: newUser.userType});
    //sms.sendSms(req.body.mobileNo);
    console.log("new user created with token");
  }catch (err) {
    const error = auth.handleErrors(err);
    res.status(400).json({Error: error.emailId});
    console.log(error.emailId);
  } 
});



app.listen(3200, (err) => {
  if(err){
    console.log(err);
  }
  console.log("Listening to port 3200");
});
