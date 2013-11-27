var http = require('http');
var todo = require('./todo_list');


var server = http.createServer(function(req, res){
	if ('/' == req.url) {
		switch (req.method) {
		case 'GET':
			todo.show(res);
		break;
		case 'POST':
			todo.add(req, res,function(res){
				todo.show(res);
			});
		break;
		default:
			todo.badRequest(res);
	}
	} else {
		todo.notFound(res);
	}
});

server.listen(3000);