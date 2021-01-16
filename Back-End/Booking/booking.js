const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const sendEmail = require('./sendEmail');

//swagger libraries
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

//middleware
app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:4200'}));

//mongoose
const mongoose = require('mongoose');

require('./bookingDataModel');
const booking = mongoose.model("booking");


mongoose.connect('mongodb+srv://Kartik:1234@cluster0.nvlfp.mongodb.net/booking_project?retryWrites=true&w=majority', ()=>{
  console.log('Database connected');
});

//swagger
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Booking Microservice",
      description: "Booking microservice constains http methods",
      contact: {
        name: "BookMyFlight"
      },
      servers: ["http://localhost:3300"]
    }
  },

  apis: ["booking.js"]
};

//swagger middleware
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/booking/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


//GET METHOD

/**
 * @swagger
 * /booking/all:
 *  get:
 *    description: Use to get all bookings
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: Server error.
 */
app.get("/booking/all", (req, res) => {
  booking.find().then((data) => {
    //console.log(data);
    res.status(200).send(data);
  }).catch(err => {
    if(err){
      res.status(400).json(`Error: ${err}`);
    }
  })
})


/**
 * @swagger
 * /booking/allbookings/{userId}:
 *  get:
 *    description: Use to get all bookings of that user
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: Server error.
 *  parameters:
 *        - in: path
 *          name: userId
 *          required: true
 *          schema:
 *            type: String
 *          description: User Object Id
 */
app.get('/booking/allbookings/:userId', (req, res) => {
  //console.log('inside get'+req.params.userId);
  var objectId = mongoose.Types.ObjectId(req.params.userId);
  var myArr = [];
  booking.find({userId:objectId}).then((response)=>{

    for(let i of response){
      let bookingObj = {
        flight: i.flight,
        bookingId: i.bookingId,
        userDetails: i.userDetails
      }
      myArr.push(bookingObj);
    }
    //console.log(myArr);
    res.status(200).send(myArr);
  }).catch((err) => {
    if(err){
      throw err;
    }
  });
});

//POST METHOD

var bookingId = 200;
var userEmail = '';
app.post("/booking/add/:flightName/:userId", (req, res)=>{
  let flightName = req.params.flightName;
  userEmail = req.body.user.email;
  //console.log(userEmail);
  var newBooking = {
    userId: mongoose.Types.ObjectId(req.params.userId),
    flight:{
      flightName: flightName,
      airLine: req.body.flight.airLine,
      source: req.body.flight.source,
      destination: req.body.flight.destination,
      fare: req.body.flight.fare,
    },
    userDetails:{
      firstName: req.body.user.firstName,
      lastName: req.body.user.lastName,
      email: req.body.user.email
    },
    bookingId: bookingId
  }
    var booking1 = new booking(newBooking);
    booking1.save().then(() =>{
    sendEmail.mailSend(userEmail);
    res.status(200).json({bookingId: bookingId});
    bookingId++;
    console.log('booking success');
    });
});

//DELETE BOOKING

/**
 * @swagger
 * /booking/cancel/{bookingId}:
 *  delete:
 *    description: Use to cancel
 *    responses:
 *      '200':
 *        description: Booking successfully cancelled
 *      '400':
 *        description: Server error.
 *  parameters:
 *        - in: path
 *          name: bookingId
 *          required: true
 *          schema:
 *            type: number
 *          description: bookingId
 */

app.delete("/booking/cancel/:bookingId", (req, res)=>{
  booking.deleteOne({bookingId: req.params.bookingId}).then((response)=>{
    res.status(200).send(response);
    console.log("booking cancelled");
  })
});




app.listen(3300, (err) => {
  if(err){
    console.log(err);
  }
  console.log("Listening to port 3300");
});

module.exports =  app;