const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Mongoose is connected!");
});

//Define a schema for images
let imageSchema = mongoose.Schema({
  img: { data: Buffer, contentType: String },
  labels: [],
  created : {
    type : Date,
    default : Date.now
  }
});

var Image = mongoose.model('Image', imageSchema);

module.exports = Image;
