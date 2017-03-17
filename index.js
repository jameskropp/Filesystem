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

app.get('/', (req, resp)=>{
  resp.sendFile(pF+'/index.html');
});

app.post('/upload', function(req, resp){
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
   resp.end('success');
 });
 form.parse(req);
})

app.post('/viewfiles', function(req, resp){
  var filesfound = [];
  fs.readdir(pF+"/uploads/", (err, files) => {
    if(err){
      return resp.end();
    }
    files.forEach(file => {
      filesfound.push(file);
    });
    resp.send(filesfound);
  })
})

app.get('/download', function(req, res){
  var filename = req.query.filename;
  var file = __dirname +'/public/uploads/' + filename;
  res.download(file, function(err){
    if(err){
      console.log(err);
    }
  });
})

app.listen(port, function(err){
  if(err){
    console.log("Error: " + err);
    return false;
  }
  console.log(port + " is running");
})
