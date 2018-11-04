let fs = require('fs');
let data = fs.readFileSync('./input.txt');
console.log(data.toString());
const buf = Buffer.from(data);

console.log(buf.toString('hex')); //68656c6c6f

console.log(buf.toString('base64')); //aGVsbG8=