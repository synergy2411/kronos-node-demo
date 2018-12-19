var cluster = require("cluster");
var numCPUs = require("os").cpus().length;
var http = require("http");

if (cluster.isMaster) {
    // console.log("Starting new process.")
    // console.log("Master : ", cluster.process.pid);

    for (var i = 0; i < numCPUs; i++) {
        setTimeout(() => {
            var worker = cluster.fork();
            console.log("Worker started with PID #" + worker.process.pid);
        }, 1000);
    }

} else {
    http.createServer((req, res)=>{
        res.write("Helo from " + process.pid);
        res.end();
    }).listen(3030);
    console.log("Worker process started", process.pid);
    // process.exit();
}