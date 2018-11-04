let http = require("http");
http.createServer((req,res)=>{
    res.writeHead(200,{"Content-Type":"text/plane"});

    res.end("hello world")
}).listen(8002,function () {
    console.log("yes");
});