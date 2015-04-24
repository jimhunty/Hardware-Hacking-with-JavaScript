var app = require('express')();
var http = require('http').Server(app);
// Load socket.io
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

// We establish the Web Socket connection with the browser
io.on('connection', function(socket){
	console.log('a user has connected');
	socket.emit('Server message', "Hello from the Server!");
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});