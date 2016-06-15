var events = require ('events');
var myEmitter = new events.EventEmitter();

myEmitter.on('lala', function (err) {
	console.log('err:' + err);
});

myEmitter.emit('lala', 'lalalalalalla');