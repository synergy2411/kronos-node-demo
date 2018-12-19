const mongodb = require("mongodb");
const client = mongodb.MongoClient;
let _db;
module.exports.connect = function(){
    client.connect("mongodb://localhost:27017", function(err, database){
        if(err){
            console.log(err);
            process.exit(1);
        }
        console.log("Mongo Connected!");
        _db = database.db("kronos_db");
    })
}

module.exports.getUsers = function(){
    return _db.collection("users");
}

module.exports.findUser = function(user){
    _db.collection("users").find(user).toArray((err, result)=>{
        if(err) console.log(err);
        console.log(result);
    })
}

module.exports.removeUser = function(key){
    _db.collection("users").remove(key, (err, result)=>{
        if(err) console.log(err);
        console.log(result);
    })
}