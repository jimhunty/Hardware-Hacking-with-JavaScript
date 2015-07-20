var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var jfive = require("johnny-five");
var board = new jfive.Board();

var board, tempSensor, lightSensor, socket,
	connected = false;

var readings = {
	temp: 0,
	light: 0
}

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(s){
	console.log('a user has connected');
	connected = true;
	socket = s;
});

board.on("ready", function() {
	console.log('board has connected'); 	

	var tempSensor = new jfive.Temperature({
		controller: "LM35",
		pin: "A0"
	});
	
	tempSensor.on("data", function(err, data) {
		readings.temp = data.celsius;
		if(connected) socket.emit('SensorReadings', readings);
	});  

	lightSensor = new jfive.Sensor({
		pin: "A1",
		freq: 250
	});

	lightSensor.on("data", function(data) {
		readings.light = this.value;
		if(connected) socket.emit('SensorReadings', readings);
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});