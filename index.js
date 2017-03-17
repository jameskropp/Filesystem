const express = require('express');
const React = require('react');
const port = process.env.PORT || 10000;
const path = require('path');
const formidable = require('formidable');
const fs = require('fs');

var app = express();
var pF = path.resolve(__dirname, "public");

app.use("/scripts", express.static('build'));
app.use("/css", express.static(pF+'/css'));
app.use("/uploads", express.static(pF+'/uploads'));

app.get('/', (req, res)=>{
  res.sendFile(pF+'/index.html');
});

// Upload file system using Formidable to upload all files to the uploads folder
app.post('/upload', function(req, res){
  var form = new formidable.IncomingForm();
  form.multiples = true;
  form.uploadDir = path.join(__dirname, "/public/uploads")

  form.on('file', function(field, file){
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });
  form.on('error', function(err){
    console.log("Error: " + err);
  })
  form.on('end', function() {
   res.end('success');
 });
 form.parse(req);
})

// Lists out all the files in the uploads folder and than sends the list to the frontend
app.post('/viewfiles', function(req, res){
  var filesfound = [];
  fs.readdir(pF+"/uploads/", (err, files) => {
    if(err){
      return res.end();
    }
    files.forEach(file => {
      filesfound.push(file);
    });
    res.send(filesfound);
  })
})

// Grabs the file name from the frontend and if it exists it will download.
app.get('/download', function(req, res){
  var filename = req.query.filename;
  var file = __dirname +'/public/uploads/' + filename;
  res.download(file, function(err){
    if(err){
      console.log(err);
    }
  })
})

app.get('/delete', function(req, res){
  var filename = pF + "/uploads/" + req.query.filename;
    fs.unlink(filename, function(err){
      if (err){
        return console.error(err);
      }
      res.end('success');
    });
})

app.listen(port, function(err){
  if(err){
    console.log("Error: " + err);
    return false;
  }
  console.log(port + " is running");
})
