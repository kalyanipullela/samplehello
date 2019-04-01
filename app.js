var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var MongoClient =require('mongodb').MongoClient;
var mongoUrl ='mongodb://mrecruiter:6gG606YNLb00UC9C@139.59.16.158:27017'
MongoClient.connect(mongoUrl,{ useNewUrlParser: true },function(err,client) {
	if(err) { 
		console.log("Connection failed: Error:"+err);
		
		}
		else{
			console.log("Connected to MongoDB");
			app.get('/', function(req,res){
				var db = client.db('mrecruiter');
			db.collection('mrecruiter_test').find().toArray(function(err, value){
				if(err) throw err;
					res.json(value);
			});

		})
			app.post('/add', function(req, res) {
			var db = client.db('mrecruiter');
			db.collection('mrecruiter_test' ).insertOne( req.body, function(err, value){
				if(err) throw err;	
					res.json(value);
			});
		});
	}
});

app.listen(3000,function(req,res){
console.log("Server listening to port 3000");
}) 
