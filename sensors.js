// Johnny Five (https://github.com/rwaldron/johnny-five) is our JavaScript Framework for accessing the Arduino
var jfive = require("johnny-five");
var board, tempSensor, lightSensor;

var readings = {
	temp: 0,
	light: 0
}

board = new jfive.Board();

board.on("ready", function() {
	// we create a new sensor instance and define the sensor type and the pin it’s connected to
	var tempSensor = new jfive.Temperature({
		controller: "LM35",
		pin: "A0"
	});

	// we add an event listener to the sensor and handle the data
	tempSensor.on("data", function(err, data) {
		// the data object also has a fahrenheit property if that’s what we are after 
		readings.temp = data.celsius;
		// console.log(readings.temp + "°C");
	});

	// we create a new sensor instance and define the pin it’s connected to
	lightSensor = new jfive.Sensor({
		pin: "A1",
		freq: 250
	});

	// we add an event listener to the sensor and handle the data reading
	lightSensor.on("data", function() {
		readings.light = this.value; 
		console.log(readings.light);
	});
});