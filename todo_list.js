var qs = require('querystring');
var ds = require('./datastore');

module.exports = {
  show: function (res) {
  	    var items = ds.get();
  		var html = '<h1>Todo List</h1>'
					+ '<ul>'
					+ items.map(function(item){
					return '<li>' + item + '</li>'
					}).join('')
					+ '</ul>'
					+ '<form method="post" action="/">'
					+ '<p><input type="text" name="item" /></p>'
					+ '<p><input type="submit" value="Add Item" /></p>'
					+ '</form>';

		res.setHeader('Content-Type', 'text/html');
		res.setHeader('Content-Length', Buffer.byteLength(html));
		res.end(html);
  },
  notFound: function (res) {
	    res.statusCode = 404;
		res.setHeader('Content-Type', 'text/plain');
		res.end('Not Found');
  },

  badRequest: function(res){
	  	res.statusCode = 400;
		res.setHeader('Content-Type', 'text/plain');
		res.end('Bad Request');
  },

  add: function(req, res,callback){
		var body = '';
		req.setEncoding('utf8');
		req.on('data', function(chunk){ body += chunk });
		req.on('end', function(){
			var obj = qs.parse(body);
			ds.add(obj.item);
			callback(res);
		});

  }
};

