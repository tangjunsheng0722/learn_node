/*
let fs = require('fs');
let data = '';
//创建可读流
let readerStream = fs.createReadStream('input.txt');
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

console.log('over');*/

/*//可写流
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

console.log('over');*/
// 管道流
/*let fs = require('fs');
// 创建一个可读流
let readerStream = fs.createReadStream('input.txt');
// 创建一个可写流
let writerStream = fs.createWriteStream('output.txt');
// 管道读写操作  读取input.txt的内容 写入到output.txt中
readerStream.pipe(writerStream);
console.log('over');*/
//链式流
let fs = require('fs');
let zlib = require('zlib');
    // 压缩input.txt到input.txt.gz
 fs.createReadStream('input.txt').pipe(zlib.createGzip()).pipe(fs.createWriteStream('input.txt.gz'));
    //解压input.txt.gz 到input.txt
fs.createReadStream('input.txt.gz').pipe(zlib.createGunzip()).pipe(fs.createWriteStream('input.txt'));
console.log('success');