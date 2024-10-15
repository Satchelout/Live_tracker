const express =require("express");
const app = express();
const path= require("path");
const http = require("http"); // creat http server for running the scket io

const socketio = require("socket.io");
const server = http.createServer(app);   // node module for crate server
const io = socketio(server);   //create socket function

app.set("view engine" , "ejs");    //setup the ejs 
app.use(express.static(path.join(__dirname,"public")));

io.on("connection", function(socket) {

    socket.on("send-location",function (data){
        io.emit("receive-location",{id: socket.id, ...data});
    });
    socket.on("disconnect",function(){
        io.emit("user-disconnected",socket.id);
    });
});

app.get("/", function(req, res) {
  
    res.render("index");  //documentation of express

});

server.listen(3000,()=>{
    console.log("server listening port 3000");
}); //listen to the particular port
