var http = require ('http');
var fs = require ('fs');
var parse = require ('url').parse;
var join = require ('path').join;
var root = __dirname;
http.createServer(function (req, res) {
	// req.pipe(fs.createWriteStream('./req.txt'));
	// res.statusCode = 200;
	// res.end('ok'+req.method);
	// JSON.stringify(req.toString())
	var url = parse(req.url);
	var path = join(root, url.pathname);
	fs.stat(path, function (err, stat) {
		if (err) {
			if ('ENOENT' == err.code) {
				res.statusCode = 404;
				res.end('not found');
			}else{
				res.statusCode = 500;
				res.end('internal server err');
			}
		}else{
			res.setHeader('Content-Length', stat.size);
			var stream = fs.createReadStream(path);
			
			stream.on('error', function (err) {
				res.statusCode = 500;
				res.end('internal server err.');
			})
			stream.pipe(res);
		}
	});
	
	// var stream = fs.createReadStream(path);
	// stream.on('error', function (err) {
	// 	res.statusCode = 500;
	// 	res.end('Internal err');
	// });
	// stream.pipe(res);
	// // res.end('\nok..'+ path);
}).listen(3000);