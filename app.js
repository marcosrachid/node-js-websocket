var app = require('./config/server');

var server = app.listen(80, function(){
	console.log("Running...");
});

require('socket.io').listen(server);