// console.log("Hello World!")

// function longRunningOpr(){
//     setTimeout(()=>{
//         console.log("Running...");
//     }, 2000);
// }

// function webRequest(req){
//     console.log("Starting with ID #"+ req.id);
//     longRunningOpr();
//     console.log("Ending with ID #"+ req.id);
// }

// webRequest({id : 1})
// webRequest({id : 2})


//Core Module
    // - path
        // var path = require("path");
        // var url = "http://www.example.com/public/index.html"

        // console.log(path.dirname(url));
        // console.log(path.extname(url));
        // console.log(path.basename(url));
    // - os
        // var os = require("os");
        // console.log(os.arch());
        // console.log(os.cpus().length);
        // console.log(os.totalmem());
    
// File Module : 
    // var myModule = require("./my-module");
    // myModule.foo();
    // console.log(myModule.MAGIC_NUMBER);
    // console.log(myModule.MAGIC_NUMBER);
    
// External Module
    // require("colors");

    // console.log("Welcome to NodeJS".green);
    // console.log("Welcome to NodeJS".red);
    // console.log("Welcome to NodeJS".blue);
    // console.log("Welcome to NodeJS".inverse);

    // - http


    // var http = require("http");
    // var morgan = require("morgan");

    // var server = http.createServer((request, response)=>{
    //     console.log("Method : " , request.method)
    //     morgan('dev');
    //     response.write("Hello Client");
    //     response.end();
    // })
    // server.listen(9090, function(){
    //     console.log("Server listen on Port 9090");
    // })


    // - events

       
    // var EventEmitter = require("events").EventEmitter;
    // var emitter = new EventEmitter();
    
    //Handler

    // emitter.on("removeListener", (eventName , listerenFunc) => {
    //     console.log(eventName + " event with removed the handler " + listerenFunc.name );
    // })  

    // emitter.on("newListener", (eventName , listerenFunc)=>{
    //     console.log(eventName + " event with handler " + listerenFunc.name );
    // })

    // function handler1(){
    //     console.log("New Handler!");
    // }
    // emitter.setMaxListeners(25);
    // for(let i = 0; i <20; i++){
    //     emitter.on("foo", handler1);
    // }

    // emitter.on("foo", (message)=>{
    //     console.log("Foo Event Triggered with " + message.msg);
    //     // emitter.removeListener("foo", handler1);
    // });

    // // generate
    // emitter.emit("foo", {msg :  "Some data"});
    // emitter.emit("foo", {msg :  "Some data"});

    // emitter1.emit("foo");

    // var fs = require("fs");
    // var gLib = require("zlib").createGzip();
    // var readStream = fs.createReadStream("cool.txt");
    // var writeStream = fs.createWriteStream("new-cool.gz");
    // readStream.pipe(gLib).pipe(writeStream);

    // var str = "Some string";
    // var buf = new Buffer(str, 'utf-8');

    // console.log(buf);

    // var roundTrip = buf.toString();
    // console.log(roundTrip);

    // fs.readFile("cool.txt", (...args)=>{
    //     // console.log(args);
    //     buf = args[1];
    // })

    // console.log(buf);

    // - utils



    const express = require("express");
    const app = express();
    const morgan = require("morgan");
    const mylogger = require("./logger");
    const bodyParser = require("body-parser");
    const mongoUtil = require("./mongoUtil");

    mongoUtil.connect();

    app.use(express.static(__dirname+"/public"));

    app.use(bodyParser.urlencoded({extended : true}));

    app.use(morgan("common"));
    app.use(mylogger.logger);

    app.get("/", (req, res)=>{
        res.sendFile(__dirname+"/public/index.html");
    })

    app.get("/login", (req, res)=>{
        if(req.query){
            console.log("Usernamee : " + req.query.username)
            console.log("Password : " + req.query.password)
        }
        res.send("Data Received");
        
    })

    app.post("/login", (req, res)=>{
        // var users = mongoUtil.getUsers();

        // users.find().toArray((err, documents)=>{
        //     console.log(documents);
        // })
        let key;
        if(req.body){
            console.log("Usernamee : " + req.body.username)
            console.log("Password : " + req.body.password)
            key = {username : req.body.username}
            // mongoUtil.findUser(key);
            mongoUtil.removeUser(key)
        }
        res.send("Data received")
    })

    // app.get("/items/:id", (req, res)=>{
    //     console.log("ID : " , req.params['id']);
    //     res.json({items : [{
    //         label : "Task 1",
    //         status : "done"
    //     }]});
    // })

    app.listen(9080, ()=>{
        console.log("Server running on Port 9080...");
    })

