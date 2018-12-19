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

module.exports.updateUser = function(key, newPassword){
    _db.collection('users').updateOne(key, { 
        $set: { password : newPassword } }, function(err, result) {
            if(err) console.log(err);
        console.log("Updated the document with the new password", result);
      });
}

module.exports.insertData = function(data){
    _db.collection("users").insert(data, (err, stataus)=>{
        if(err) console.log(err);
        console.log("Data inserted!", stataus);
    })
}