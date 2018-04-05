'use strict';
// Middleware
const express = require('express');
const fs = require('fs');
const util = require('util');
const mime = require('mime-types');
const multer = require('multer');
const upload = multer({ dest: 'uploads/',
 rename: function (fieldname, filename) {
   return filename;
 },
});
const Image = require('./data/db.js');
const path = require('path');
const bodyParser = require('body-parser');

// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');
// Creates a client
const client = new vision.ImageAnnotatorClient();

let app = express();

// Simple upload form

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/client/index.html'));
});

// Get the uploaded image
// Image is uploaded to req.file.path
app.post('/upload', upload.single('image'), function(req, res, next) {

  // Choose what the Vision API should detect
  // Choices are: faces, landmarks, labels, logos, properties, safeSearch, texts
  var types = ['labels'];
  console.log(req.body);
  // Send the image to the Cloud Vision API
  client
  .labelDetection(req.file.path)
  .then(results => {
    // Pull all labels from POST request
    const labels = [];
    results[0].labelAnnotations.forEach(function(element) {
      labels.push(element.description);
    })
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });

    // Create new Image Record
    let image = new Image ({});
    image.data = fs.readFileSync(req.file.path);
    image.contentType = 'image/png';
    image.labels = labels;
    image.save((err) => {
      if (err) {
        console.log('Error:' , err);
      }
    })

    res.write('<!DOCTYPE HTML><html><body>');

    // Base64 the image so we can display it on the page
    res.write('<img width=600 src="' + base64Image(req.file.path) + '"><br>');

    // Write out the JSON output of the Vision API
    res.write(JSON.stringify(labels, null, 4));
    // Delete file (optional)
    fs.unlinkSync(req.file.path);

    res.end('</body></html>');
  })

  // ERROR from Cloud Vision API
  .catch(err => {
    console.log(err);
    res.end('Cloud Vision Error:' , err);
  });
});

app.listen(8080);
console.log('Server listening on 8080');

// Turn into Base64, an easy encoding for small images
function base64Image(src) {
  var data = fs.readFileSync(src).toString('base64');
  return util.format('data:%s;base64,%s', mime.lookup(src), data);
}
