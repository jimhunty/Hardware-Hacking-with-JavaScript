var jfive = require("johnny-five");
var board;

board = new jfive.Board();

board.on("ready", function() {
	// we create a new sensor instance and define the sensor type and the pin it’s connected to
	// if you have an LM35 change it in the controller property
	var tempSensor = new jfive.Thermometer({
		controller: "TMP36",
		pin: "A0"
	});

	// we add an event listener to the sensor and handle the incoming data
	tempSensor.on("data", function() {
		// the data object also has a fahrenheit property if that’s what we are after 
		console.log(this.celsius + "°C");
	});
});