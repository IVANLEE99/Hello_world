// 正确的
var events = require ('events'),
	util = require ('util');

function Watcher(watchDir, processedDir) {
	this.watchDir = watchDir;
	this.processedDir = processedDir;
}

util.inherits(Watcher, events.EventEmitter);

var fs = require ('fs'),
	watchDir = './watch',
	processedDir = './done';

Watcher.prototype.watch = function () {
	var watcher = this;
	fs.readdir(this.watchDir, function (err, files) {
		if (err) {
			throw err;
		}
		for(var index in files){
			console.log('index-----' + index);
			watcher.emit('process', files[index]);
		}
	});
}

Watcher.prototype.start = function () {
	var watcher = this;
		watcher.watch();
	
}

var watcher = new Watcher(watchDir, processedDir);
 
 watcher.on('process', function (file) {
 	var watchFile = this.watchDir + '/' + file;
 	console.log('watchFile-----' + watchFile);
 	var processedFile = this.processedDir + '/' + file.toLowerCase();
 	console.log('processedFile-----' + processedFile);

 	fs.rename(watchFile, processedFile, function (err) {
 		if (err) {throw err;}
 	});
 });


 watcher.start();

