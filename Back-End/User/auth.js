const jwt = require("jsonwebtoken");

const maxAge = 1 * 24 * 60 * 60; //day*hour*minute*second becaues jwt accept time in miliseconds
const createToken = (id) => {
  return jwt.sign({id}, "token", {
    expiresIn: maxAge
  });
}

//handling errors
const handleErrors = (err)=>{
  console.log(err.message,err.code);
  let errors={emailId:'',password:''};

  //incorrect email
  if(err.message==="incorrect email"){
    errors.emailId="Not a registered Email";
  }

  //incorrect password
  if(err.message==="incorrect password"){
    errors.password="Incorrect Password";
  }
  //duplicate errors
  if(err.code===11000){
    errors.emailId="Already a registered Email";
    return errors;
  }

  //validation errors
  if(err.message.includes('user validation failed')){
    Object.values(err.errors).forEach(({properties})=>{
      errors[properties.path]=properties.message;
    });
  }
  return errors;
}



module.exports = { createToken, maxAge, handleErrors };