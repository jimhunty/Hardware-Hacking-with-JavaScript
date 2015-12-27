var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var jfive = require("johnny-five");
var board = new jfive.Board();

var board, socket,
	connected = false;

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(s){
	console.log('a user has connected');
	// tracking connection
	connected = true;
	// saving this for the board on ready callback function
	socket = s;
});

board.on("ready", function() {
	console.log('board has connected'); 	

	var tempSensor = new jfive.Thermometer({
		controller: "TMP36",
		pin: "A0"
	});
	
	tempSensor.on("data", function() {
		// We send the temperature when the browser is connected
		if(connected) socket.emit('Temperature reading', this.celsius);
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});