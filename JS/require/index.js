let obj = {
  add: (a, b) => a + b + a + b
}
undefined && (obj = require('./utils.js'))

console.log(obj.add(1,2))