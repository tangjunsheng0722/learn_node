# node 基础
## 1.创建服务
> 引入require模块 -> 创建服务器 -> 接受请求和响应请求
```
let http = require('http');
http.createServer(function(req,res){
    // 发送HTTP 头部
    // HTTP状态值 ：200 ：ok
    // 内容类型 text/plain
    res.writeHead(200,{'Content-Type':'text/plain'});
    // 发送响应数据 'helo world'
    res.end('hello world')
})
```
## 2.node.js 回调函数
>Node.js异步编程的直接体现就是回调

>例如，我们可以一边读取文件，一边执行其他命令，在文件读取完成后，我们将文件内容作为回调函数的参数返回。这样在执行代码时就没有阻塞或等待文件 I/O 操作。这就大大提高了 Node.js 的性能，可以处理大量的并发请求。
```
// 阻塞实例
let fs = require('fs');
let data = fs.readFileSync('input.txt'); // input.txt 内容为： hello
console.log(data.toString());
console.log('result');
  // 执行结果: hello
  //          result
// 非阻塞实例
let fs = require('fs');
fs.readFile('input.txt',function(err,data){
    if(err) return console.log(err);
    console.log(data.toString);
})
console.log('result');
  //执行结果：result
  //         hello
```
## 3.事件循环
> Node.js 是单进程单线程应用程序，但是因为 V8 引擎提供的异步执行回调接口，通过这些接口可以处理大量的并发，所以性能非常高。

> Node.js 几乎每一个 API 都是支持回调函数的。

> Node.js 基本上所有的事件机制都是用设计模式中观察者模式实现。

> Node.js 单线程类似进入一个while(true)的事件循环，直到没有事件观察者退出，每个异步事件都生成一个事件观察者，如果有事件发生就调用该回调函数.
## EventEmitter
> events 模块只提供了一个对象： events.EventEmitter。  EventEmitter 的核心就是事件触发与事件监听器功能的封装
```
let events = require('events');
// 创建eventEmitter对象
let eventEmitter = new events.EventEmitter();
// 创建事件处理函数
let connectHandler = function connected() {
    console.log('connect_success');
    //出发 data_received 事件
    eventEmitter.emit('data_received');
};
// 绑定connection事件处理程序
eventEmitter.on('connection',connectHandler);

// 使用匿名函数绑定data_received事件
eventEmitter.on('data_received',function () {
    console.log("数据接收成功");
});
// 触发connection事件
eventEmitter.emit('connection');
console.log('over');
/*
输出结果：connect_success
         数据接收成功
         over
*/
```
## Buffer
> JavaScript 语言自身只有字符串数据类型，没有二进制数据类型。但在处理像TCP流或文件流时，必须使用到二进制数据。因此在 Node.js中，定义了一个 Buffer 类，该类用来创建一个专门存放二进制数据的缓存区。
```
const buf = Buffer.from('hello');
console.log(buf.toString('hex')); //68656c6c6f
console.log(buf.toString('base64')); //aGVsbG8=
```
## Stream(流)
> Stream 是一个抽象接口，Node 中有很多对象实现了这个接口。例如，对http 服务器发起请求的request 对象就是一个 Stream，还有stdout（标准输出）

>Node.js,Stream有四种流类型：Readable-可读操作， Writable-可写操作，Duplex-可读可写操作， Transform-操作被写入数据，然后读出结果

>所有的 Stream 对象都是 EventEmitter 的实例。常用的事件有:
```
data - 当有数据可读时触发。
end - 没有更多的数据可读时触发。
error - 在接收和写入过程中发生错误时触发。
finish - 所有数据已被写入到底层系统时触发。
```
>Readable
```
let fs = require('fs');
let data = '';
//创建可读流
let readerStream = fs.createReadStream('input.txt'); // input.txt内容为 'hello'
//设置编码为utf-8
readerStream.setEncoding('utf-8');
//处理事件流 --> data,end,error
readerStream.on('data',function (chunk) {
    data+=chunk;
});
readerStream.on('end',function () {
    console.log(data);
});
readerStream.on('error',function (err) {
    console.log(err.stack);
});

console.log('over');

/*
    result:  over
             hello
*/
```
> Writable
```
let fs = require('fs');
let data = 'hello world';
 // 创建一个可写流
let writerStream = fs.createWriteStream('output.txt');  // output.txt 初始不管是什么  写入成功后 都会变成写入的data
 //使用utf-8编码写入数据
writerStream.write(data,'utf-8');
// 标记文件末尾
writerStream.end();
// 处理流事件
writerStream.on('finish',function () {
    console.log("success");
});
writerStream.on('error',function (err) {
    console.log(err.stack);
});

console.log('over');
```
> 管道流
```
let fs = require('fs');
// 创建一个可读流
let readerStream = fs.createReadStream('input.txt');
// 创建一个可写流
let writerStream = fs.createWriteStream('output.txt');
// 管道读写操作  读取input.txt的内容 写入到output.txt中
readerStream.pipe(writerStream);
console.log('over');
```
> 链式流
```
let fs = require('fs');
let zlib = require('zlib');
    // 压缩input.txt到input.txt.gz
 fs.createReadStream('input.txt').pipe(zlib.createGzip()).pipe(fs.createWriteStream('input.txt.gz'));
    //解压input.txt.gz 到input.txt
fs.createReadStream('input.txt.gz').pipe(zlib.createGunzip()).pipe(fs.createWriteStream('input.txt'));
console.log('success');
```
## Node.js 模块系统
```
    //在hello.js中导出一个模块
exports.world = function () {
    console.log('Hello World');
};
    //在main.js中引入这个模块
let hello = require('./hello');
hello.world();
// 运行结果：'Hello World'
```
## Node.js 路由
> 我们要为路由提供请求的 URL 和其他需要的 GET 及 POST 参数，随后路由需要根据这些数据来执行相应的代码
```
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
```
## Node.js 全局对象
> Javascript中有一个特殊的对象--全局对象，它及其所有属性都可以在程序中任何地方访问，即全局变量
```
console.log(__filename); // 返回的值是模块文件的路径
console.log(__dirname);  // 返回的值是当前执行脚本所在的目录
```
## Node.js 常用工具
> util 是一个Node.js 核心模块，提供常用函数的集合，用于弥补核心JavaScript 的功能 过于精简的不足
