var http = require ('http');
var qs = require ('querystring');
var items = [];

var server = http.createServer(function (req, res) {
	if ('/' == req.url) {
		switch(req.method){
			case 'GET':
			show(res);
			break;
			case 'POST':
			add(req, res)
			break;
			default:
			badRequest(res);
		}
	}else{
			notFound(res);
	}
});

server.listen(3000);

function show(res) {
	var html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>TO-DO-LIST</title></head><body>'
			+'<h1>TO-DO-LIST</h1>'
			+'<ul>'
			+items.map(function (item, i) {
				return '<li>' + item.item + '</li>'
			}).join('')
			+'</ul>'
			+'<form action="/" method="post">'
			+'<p><input type="text" name="item"></p>'
			+'<p><input type="submit" value="Add Item"></p>'
			+'</form>'
			+'</body></html>';
	res.setHeader('Content-Type', 'text/html');
	res.setHeader('Content-Length', Buffer.byteLength(html));
	res.end(html);
}

function add(req, res) {
	var body = '';
	req.setEncoding('utf8');
	req.on('data', function (chunk) {
		body += chunk;
	});
	req.on('end', function () {
		var obj = qs.parse(body);
		console.log('类型====='+typeof(body));
		console.log('obj类型====='+typeof(obj));
		console.log('body====='+body);
		items.push(obj);
		show(res);
	});

}

function badRequest(res) {
	res.statusCode = 400;
	res.setHeader('Content-Type', 'text/plain');
	res.end('Bad Request.');
}

function notFound(res) {
	res.statusCode = 400;
	res.setHeader('Content-Type', 'text/plain');
	res.end('notFound');
}