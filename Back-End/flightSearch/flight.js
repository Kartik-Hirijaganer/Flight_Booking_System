const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');

//swagger libraries
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

//middleware
app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:4200'}));

const mongoose = require('mongoose');

require("./flightDataModel");
const flight = mongoose.model("flight");

mongoose.connect('mongodb+srv://Kartik:1234@cluster0.nvlfp.mongodb.net/flight_project',{ useNewUrlParser: true, useUnifiedTopology: true });
console.log('Database connected');

//swagger
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Flight Microservice",
      description: "Flight microservice constains http methods will be used by admin",
      contact: {
        name: "BookMyFlight"
      },
      servers: ["http://localhost:3000"]
    }
  },

  apis: ["flight.js"]
};

//swagger middleware
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/flight/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


//GET METHODS

//GET FLIGHT BY FLIGHT-NAME
/**
 * @swagger
 * /flight/{flightName}:
 *  get:
 *    description: Use to get all flights
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Server error.
 *  parameters:
 *        - in: path
 *          name: flightName
 *          required: true
 *          schema:
 *            type: String
 *          description: Flight-Name
 */
app.get('/flight/:flightName', (req, res)=>{
  flight.findOne({flightName : req.params.flightName}).then((data)=>{
    res.status(200).send(data);
    // console.log(data);
  }).catch(err => {
    if(err){
      res.status(404).json(`Error: ${err}`);
    }
  })
});

//RETURN ALL FLIGHTS 

/**
 * @swagger
 * /flights:
 *  get:
 *    description: Use to get all flights
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Server error.
 */
app.get('/flights', (req, res) => {
  flight.find().then((data) => {
    res.status(200).send(data);
  }).catch(err => {
    if(err){
      res.status(404).json(`Error: ${err}`);
    }
  });
});


//GET FLIGHTS BY SOURCE AND DESTINATION

/**
 * @swagger
 * /flights/{source}/{destination}:
 *  get:
 *    description: Use to get flights by source and destination
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: Server error.
 *  parameters:
 *        - in: path
 *          name: source
 *          required: true
 *          schema:
 *            type: String
 *          description: Source
 * 
 *        - in: path
 *          name: destination
 *          required: true
 *          schema:
 *            type: String
 *          description: Destination
 */

app.get("/flights/:source/:destination", (req, res) => {
  let source = req.params.source.toLowerCase();
  let dest = req.params.destination.toLowerCase();

  flight.find({source:source, destination: dest}).then((data)=>{
    res.status(200).send(data);
  }).catch(err => {
    if(err){
      res.status(400).json(`Error: ${err}`);
    }
  })
});


//POST METHOD

//ADD NEW FLIGHT
//app.use(express.json());
/**
 * @swagger
 * definitions:
 *  Flight:
 *   type: object
 *   properties:
 *    flightName:
 *      type: string
 *      description: Name of the flight
 *      example: 'GA-101'
 *    airLine:
 *      type: string
 *      description: name of the air-line
 *      example: 'Go-Air'
 *    source:
 *      type: string
 *      description: source
 *      example: 'mumbai'
 *    destination:
 *      type: string
 *      description: Destination
 *      example: 'delhi'
 *    fare:
 *      type: number
 *      description: fare of the flight
 *      example: 2000
 *    
 */


/**
 * @swagger
 * /flight/add:
 *   post:
 *     tags:
 *       - Flights
 *     description: Creates a new flight
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: flight
 *         description: Flight object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Flight'
 *     responses:
 *       200:
 *         description: Flight Successfully added
 *       400:
 *         description: Server Error
 */
app.post('/flight/add', (req, res)=>{
  var newFlight = {
    airLine: req.body.airLine,
    flightName: req.body.flightName,
    source: req.body.source,
    destination: req.body.destination,
    fare: req.body.fare
  }

  var flight1 = new flight(newFlight);
  flight1.save().then((data) =>{
    console.log('new flight created');
    res.status(200).send(data);
  }).catch((err)=>{
    res.status(400).json(`Error: ${err}`);
  })
});

//UPDATE FLIGHT     

/**
 * @swagger
 * /flight/edit/{id}:
 *   put:
 *     tags:
 *       - Flights
 *     description: Creates a new flight
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: flight object id
 *         in: path
 *         required: true
 *         schema:
 *          type: string
 *          description: user's object id
 *       - name: flight
 *         description: Flight object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Flight'
 *     responses:
 *       200:
 *         description: Flight Successfully updated
 *       400:
 *         description: Server Error
 */
app.put('/flight/edit/:id', (req, res) => {

  var newFlight = {
    airLine: req.body.airLine,
    flightName: req.body.flightName,
    source: req.body.source,
    destination: req.body.destination,
    fare: req.body.fare
  }
  //var update = { "$set": { "name": name, "genre": genre, "author": author, "similar": similar}}
  flight.findByIdAndUpdate(req.params.id, 
    {"$set": newFlight}, {new: true}).then((response) => {
    console.log(`flight updated`);
    res.status(200).send(response);
  }).catch(err => {
    res.status(400).json(`Error: ${err}`);
  })
});


//DELETE FLIGHT
/**
 * @swagger
 * /flight/delete/{flightName}:
 *  delete:
 *    description: Use to delete flight by flight name
 *    responses:
 *      '200':
 *        description: Flight successfully deleted
 *      '400':
 *        description: Server error.
 *  parameters:
 *        - in: path
 *          name: flightName
 *          required: true
 *          schema:
 *            type: String
 *          description: Flight-Name
 */
app.delete('/flight/delete/:flightName', (req, res) => {
  flight.findOneAndRemove({flightName: req.params.flightName}).then((response) => {
    console.log(`${req.params.flightName} flight deleted`);
    res.status(200).send(response);
  }).catch(err => {
    res.status(400).json(`Error: ${err}`);
  })
});




app.listen(3000, (err) => {
  // if(err){
  //   console.log(err);
  // }
  console.log("Listening to port 3000");
})

module.exports = app;