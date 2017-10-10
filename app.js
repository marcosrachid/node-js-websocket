var app = require('./config/server');

var server = app.listen(80, function(){
	console.log("Running...");
});

var io = require('socket.io').listen(server);
app.set('io', io);

// criar conexão por websocket
io.on('connection', function(socket) {
	console.log("usuario conectou");

	socket.on('disconnect', function(){
		console.log("Usuario desconectou");
	});

	socket.on('msgParaServidor', function(data) {
		socket.emit('msgParaCliente', data);
		socket.broadcast.emit('msgParaCliente', data);

		if (parseInt(data.apelido_atualizado) == 0) {
			socket.emit('participantesParaCliente', {apelido: data.apelido});
			socket.broadcast.emit('participantesParaCliente', {apelido: data.apelido});
		}
	});
});