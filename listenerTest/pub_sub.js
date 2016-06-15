var events = require ('events');
var net = require ('net');
var channel = new events.EventEmitter();

channel.clients = {};
channel.subscriptions = {};
// 设置最多的监听器的数量为50
channel.setMaxListeners(50);

// 监听join事件
channel.on('join',function (id, client) {


	this.clients[id] = client;
	this.subscriptions[id] = function (senderId, message) {
		if (id != senderId) {
			this.clients[id].write(message);
		}
	};
	this.on('broadcast', this.subscriptions[id]);

	var welcome = 'Welcome! ' + 'guests online: ' + this.listeners('broadcast').length;

	client.write(welcome + '\n');
});

// 监听leave事件
channel.on('leave', function (id) {
	// 移除该监听器
	channel.removeListener('broadcast',this.subscriptions[id]);
	channel.emit('broadcast', id, id + 'has left the chat \n');
});

// 监听关闭聊天shutdown事件
channel.on('shutdown', function () {
	channel.emit('broadcast', '', 'Chat hsa shut down \n');
	// 移除所有的监听器
	channel.removeAllListeners('broadcast');
});

var server = net.createServer(function (client) {
	var id = client.remoteAddress + ':' + client.remotePort;
	client.on('connect', function () {
		// channel.emit('join', id, client);
		// console.log('id-----'+id);
	});

// 发射join事件
	channel.emit('join', id, client);
	console.log('id-----'+id);
filewatch
	console.log('id-----'+id);

// 监听发挥数据事件
	client.on('data', function (data) {
		data = data.toString();
		if (data == 'shutdown\r\n') {
			channel.emit('shutdown');
		}
		// 发射broadcast事件
		channel.emit('broadcast', id, data);
		console.log('data-----'+data);
	});

// 监听断开连接的事件
	client.on('close', function () {
		// 发射leave事件
		channel.emit('leave', id);
	});
});

server.listen(8888);