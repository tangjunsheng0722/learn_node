let fs = require('fs');
// 阻塞代码实例
/*let data = fs.readFileSync('input.txt');
console.log(data.toString());
console.log("over");
/!*
*  data.toString()
*  over
* *!/*/
// 非阻塞代码实例
fs.readFile('input.txt',function (err,data) {
    if (err) return console.log(err);
    console.log(data.toString());
});
console.log("over");
/*
* over
* data.toString()
* */