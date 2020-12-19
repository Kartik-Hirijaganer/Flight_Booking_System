const mongoose = require("mongoose");

// mongoose.model("booking", {
//   bookingId: {
//     type: Number,
//     required: true
//   },
//   userId: {
//     type: mongoose.SchemaTypes.ObjectId,
//     required: true
//   },
//   flightId: {
//     type: mongoose.SchemaTypes.ObjectId,
//     required: true
//   }
// });

mongoose.model('booking',{
  userId : {
    type: mongoose.SchemaTypes.ObjectId,
    required : true
  },
  flight : {
    flightName:{
      type:String,
      required: true
    },
    airLine : {
      type: String,
      required: true
    },
    source : {
      type: String,
      required: true
    },
    destination : {
      type: String,
      required: true
    },
    fare : {
      type: Number,
      require: true
    }
  },
  bookingId: {
    type: Number,
    required: true
  },
  userDetails : {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type:String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  }
});