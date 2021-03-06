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

const server = http.createServer({}, app).listen(port, function () {
  console.log(`App launched on ${port}`);
});
const io = require("socket.io")(server);
var gameRoom = []
var availableAvatar = [{
    name: "jigglypuff",
    used: false
  },
  {
    name: "pikachu",
    used: false
  },
  {
    name: "squirtle",
    used: false
  },
  {
    name: "eevee",
    used: false
  },
]

var getAvatar = () => {
  let index
  do {
    index = Math.floor(Math.random() * Math.floor(availableAvatar.length))
    if (!availableAvatar[index].used) {
      availableAvatar[index].used = true
      return availableAvatar[index].name
    }
  }
  while (1);
}


var changeTeam = (team, id) => {
  for (let i = 0; i < gameRoom.length; i++)
    if (gameRoom[i].id === id) {
      gameRoom[i].lastTeam = gameRoom[i].team
      gameRoom[i].team = team
      return
    }
}

app.use("/css", express.static(__dirname + "/Game/css"));
app.use("/images", express.static(__dirname + "/Game/images"));
app.use("/scripts", express.static(__dirname + "/Game/scripts"));
app.use("/app", express.static(__dirname + "/Game/app"));
app.use("/modules", express.static(__dirname + "node_modules/"));
app.use(express.static(__dirname + "/Game/public"))
app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
io.on('connection', function (socket) {
  if (gameRoom.length < 4)
    socket.emit("need_user_name")
  else
    socket.emit("too_much_user")

  socket.on("joined_a", (data) => {
    changeTeam("a", data.user_id)
    socket.broadcast.emit('user_joined_a', data);
  })
  socket.on("joined_b", (data) => {
    changeTeam("b", data.user_id)
    socket.broadcast.emit('user_joined_b', data);
  })
  socket.on('disconnect', function () {
    for (let i = 0; i < gameRoom.length; i++) {
      if (gameRoom[i].id === socket.id) {
        io.sockets.emit('user_left', gameRoom[i].id);
        gameRoom.splice(i, 1)
        return
      }
    }
  })

  socket.on("given_user", (data) => {

    let newUser = {
      name: data.user,
      avatar: getAvatar(),
      id: socket.id,
      team: undefined,
      lastTeam: undefined
    }
    gameRoom.push(newUser)

    socket.broadcast.emit('new_user', newUser);

    socket.emit("user_ok", {
      current: newUser,
      existing: gameRoom
    })

  })
});

app.post('/new', function (req, res) {
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
