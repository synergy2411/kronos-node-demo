var express = require('express');
var app = express();
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended : true}));

app.get("/api", function(req, res){
	res.json({message : "API Success"});
})

function ensureToken(req, res, next){
	console.log('in middleware');
	var bearerHeader = req.headers['authorization'];
	if(typeof bearerHeader != 'undefined'){
		var bearer = bearerHeader.split(" ");
		var bearerToken = bearer[1];
		req.token = bearerToken;
		console.log("Token : " + req.token);
		next();
	}else{
		res.sendStatus(403);
	}
}

app.get("/api/protected", ensureToken, function(req, res){

	jwt.verify(req.token, 'my_secret_key', function(err, data){
		if(err) console.log(err);
		console.log(data);
		res.json({message : "This is protected Route"});
	});
});

app.post("/api/login", function(req, res){
	var user = {id : 3};
	//Auth User
	var token = jwt.sign({user: user}, 'my_secret_key');
	res.json({token : token});
})

app.listen(9000, function(){
	console.log("Running on Port 9000");
})