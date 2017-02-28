var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
// app.use(express.bodyParser());


// form data to fill
app.get('/', function(req, res){
  res.sendFile(__dirname+'/'+'data.html');
});


// List of user
app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "dummy.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})


// Add user
app.post('/addUser', function (req, res) {
   console.log(req.body);
   var dataId = "user" + req.body.nameid;
   var user = {
    new : {
      "name" : req.body.name,
      "password": req.body.password,
      "profession": req.body.profession,
      "id": req.body.nameid,
    }
   }
   // First read existing users.
   fs.readFile( __dirname + "/" + "dummy.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data[dataId] = user["new"];
       console.log( data );
       res.end( JSON.stringify(data));
   });
})


// Delete user by id
app.post('/deleteUser', function (req, res) {
   console.log(req.body);
   var dataId = "user" + req.body.nameid;
   // First read existing users.
   fs.readFile( __dirname + "/" + "dummy.json", 'utf8', function (err, data) {       
       data = JSON.parse( data );
       delete data[dataId];
       console.log( data );
       res.end( JSON.stringify(data));
   });
})



//manually delete
var id = 3;
app.delete('/deleteiduser', function (req, res) {
   console.log(req.body);
   var dataId = "user" + req.body.nameid;
   // First read existing users.
   fs.readFile( __dirname + "/" + "dummy.json", 'utf8', function (err, data) {       
       data = JSON.parse( data );
       delete data["user" + 3];
       console.log( data );
       res.end( JSON.stringify(data));
   });
})

// Show user detail
app.post('/getUser', function (req, res) {
  console.log(req.body);
   var dataId = "user" + req.body.nameid;
   // First read existing users.
   fs.readFile( __dirname + "/" + "dummy.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       var result = data[dataId];
       console.log( result );
       res.end( JSON.stringify(result));
   });
})






var server = app.listen(5001, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})

