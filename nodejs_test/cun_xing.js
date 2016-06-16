// 用callback串行化任务
setTimeout(function() {
	console.log('1-----');
	setTimeout(function () {
		console.log('2-----');
		setTimeout(function () {
			console.log('3-----');
		},100);
	}, 500);
},1000);

// 运用nimble实现串行化
var flow = require ('nimble');

flow.series([
	function (callback) {
	setTimeout(function () {
		console.log('11-----');
		callback();
	}, 1000);
},
function (callback) {
	setTimeout(function () {
		console.log('22-----');
		callback();
	}, 500);
},
function () {
	setTimeout(function () {
		console.log('33-----');
		
	}, 100);
}
]);