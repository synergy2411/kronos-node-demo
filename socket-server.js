var http = require("http");
var express = require("express");
var app = express();
var server = http.createServer(app);
var io = require("socket.io")(server);
var mongoUtil = require("./mongoUtil");
var chatterName;
var messageStack = [];

mongoUtil.connect();
app.get("/", (req, res)=>{
    res.sendFile(__dirname+"/public/socket-client.html");
});

io.on("connection", (client)=>{
    console.log("New Client connected!");
    client.emit("MsgToClient", {status : "Connection accepted!"})

    client.on("MsgToServer", (username, msg)=>{
        messageStack.push(msg);
        chatterName = username;
        console.log(username + " says : " + msg);
        client.emit("toClient", 'Me', msg);
        client.broadcast.emit("toClient",username, msg);
    })

    client.on("disconnect", ()=>{
        var data = {
            username : chatterName,
            messages : messageStack
        }
        mongoUtil.insertData(data);
    })
})

server.listen(3030, function(){
    console.log("Socket Server running on Port 3030...")
})