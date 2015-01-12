var express = require("express"); //you need this express variable in use
app = express();

app.get("/", function(req,res){
	res.sendFile(__dirname + "/index.html");
});

app.use("/app", express.static(__dirname + "/app"));

app.listen(3000, function(){
	console.log("listening");
});
