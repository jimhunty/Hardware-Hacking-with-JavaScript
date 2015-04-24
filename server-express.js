var app = require('express')();
var http = require('http').Server(app);

// When the user requests the route of the page (/) we respond with index.html
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});


// We listen for connections on port 3000
http.listen(3000, function(){
	console.log('listening on *:3000');
});