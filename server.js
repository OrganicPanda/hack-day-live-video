var fs = require('fs')
  , http = require('http')
  , url = require('url');

http.createServer(function(req, res) {
  var request = url.parse(req.url, true);
  var action = request.pathname;

  if (action == '/live') {
     var img = fs.readFileSync('./last-min.gif');
     res.writeHead(200, {
       'Content-Type': 'image/gif',
       'Cache-Control': 'private, no-cache, no-store, must-revalidate',
       'Expires': '-1',
       'Pragma': 'no-cache'
     });
     res.end(img, 'binary');
  } else {
     res.writeHead(200, {'Content-Type': 'text/plain' });
     res.end('Hello Hack Day\n');
  }
}).listen(8080, '0.0.0.0');
