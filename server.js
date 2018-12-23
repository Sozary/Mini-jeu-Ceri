const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const mongoUrl = "mongodb+srv://mehdi:1234@mean-lwa6j.mongodb.net/test?retryWrites=true"
const http = require("http");

// Declaration des variables
const port = "8080";

app.listen(port, () => console.log(`App launched on ${port}`))

app.use("/css", express.static(__dirname + "/Game/css"));
app.use("/images", express.static(__dirname + "/Game/images"));
app.use("/scripts", express.static(__dirname + "/Game/scripts"));
app.use("/app", express.static(__dirname + "/Game/app"));
app.use("/modules", express.static(__dirname + "node_modules/"));
app.use(express.static(__dirname + "/Game/public"))
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});


app.post('/new', function(req, res) {
  // MongoClient.connect(mongoUrl, function(err, client) {       
  //   client.db("language").collection("polish").insertOne({
  //     "Polish": req.body.pl,
  //     "French": req.body.fr,
  //   }, () => {
  //     res.json()
  //   })    
  // })
})
app.get('/list', (req, res) => {
  // MongoClient.connect(mongoUrl, function(err, client) {        
  //   client.db("language").collection("polish").find().toArray().then((data) => {
  //     res.json(data)
  //   })    
  // })
})