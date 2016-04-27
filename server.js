//eveng
var express = require("express");
var engine = require("ejs-locals");
var stylus = require("stylus");
var logger = require("morgan");
var bodyParser = require("body-parser");

var env = process.env.NODE_ENV = process.env.NODE_ENV || "development";

var app = express();

// Use EJS-Locals for all ejs templates
app.engine("ejs",engine);

app.set("views",__dirname + "/server/views");  
app.set ("view engine","ejs"); // so you can render('index')


app.use(logger('dev'));
app.use(bodyParser());

app.use(stylus.middleware(
	{
		src: __dirname + '/public',
		compile: compile
	}
));





// allow access to all public directory as the root.
app.use(express.static(__dirname + '/public'));   

app.get("*", function(req,res) {
	res.render('index');
});


app.listen(8000);

console.log("Listening on port localhost:8000");



function compile(str, path){
	return stylus(str).set('filename',path);
}
