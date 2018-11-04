
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