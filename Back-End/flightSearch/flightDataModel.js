const mongoose = require("mongoose");

mongoose.model("flight", {
  airLine: String,
  flightName:String,
  source: String,
  destination: String,
  fare: Number
});