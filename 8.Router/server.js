let http = require('http');
let url = require('url');
function router(pathname) {
    console.log("About to route a request for " + pathname);
}
function start(route) {
    function onRequest(req,res) {
        let pathname = url.parse(req.url).pathname;
        console.log(pathname);

        route(pathname);

        res.writeHead(200,{'Content-Type':'text/plain'});
        res.write('hello world');
        res.end();
    }
    http.createServer(onRequest).listen(8001);
    console.log('success');
}
start(router);