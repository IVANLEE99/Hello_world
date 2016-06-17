var http = require ('http');
var url = require ('url');
var items = [];

var server = http.createServer(function (req, res) {
	switch(req.method){
		case 'POST':
		var item = '';
		req.setEncoding('utf8');
		req.on('data', function (chunk) {
			item += chunk;
		});
		req.on('end', function () {
			items.push(item);
			res.write('ok\n');
		});
		break;

		case 'GET':
		// items.forEach(function (item, i) {
		// 	res.write(i + ')' + item + '\n');
		// });
		// res.end();
		var body = items.map(function (item, i) {
			return i + ') ' + item;
		}).join('\n') + '\n';
		res.setHeader('Content-Length', Buffer.byteLength(body));
		res.setHeader('Content-Type', 'text/plain; charset = "utf-8"');
		res.end(body);
		break;

		case 'DELETE':
		var path = url.parse(req.url).pathname;
		var i = parseInt(path.slice(1), 10);

		if (isNaN(i)) {
			res.statusCode = 400;
			res.end('invalid item id');
		} else if(!items[i]){
			res.statusCode = 404;
			res.end('item not found.');
		}else{
			items.splice(i, 1);
			res.end('OK\n');
		}
		break;

		case 'PUT':
		res.end('putputput');
		break;

		default:


	}

	// req.setEncoding('utf8');
	// req.on('data', function (chunk) {
	// 	console.log('parsed',chunk);
	// });
	// req.on('end', function () {
	// 	console.log('done parsing.');
	// });
	// console.log('done parsing.');
}).listen(3000);