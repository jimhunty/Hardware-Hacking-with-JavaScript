// Johnny Five (https://github.com/rwaldron/johnny-five) is our JavaScript Framework for accessing the Arduino
var jfive = require("johnny-five");
var board, led;

board = new jfive.Board();

// Similiar to JQuery, we wait for the board to ready
board.on("ready", function() {

  // 13 Represents the pin number that the LED is plugged into.
  led = new jfive.Led(13)

  // The LED is Strobed (turned on and off) every 1000 milliseconds
  led.strobe( 1000 );
  
});