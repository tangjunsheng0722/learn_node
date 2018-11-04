let EventEmitter = require('events').EventEmitter;
let event = new EventEmitter();

event.on('some_event',function () {
    console.log('some_event 事件绑定');
});
setTimeout(function () {
    // some_event 事件触发
    event.emit('some_event');
},1000);