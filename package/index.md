1、[lossless-json](https://github.com/josdejong/lossless-json)

使用`JSON.parse`的时候，如果  要转换的 str 中含有过长的数字或者'0.00'这种小数，会丢失精度.

```javascript
"use strict";
const LosslessJSON = require("lossless-json");

// convert LosslessNumber to number
// will throw an error if this results in information loss
function convertLosslessNumber(key, value) {
  if (value && value.isLosslessNumber) {
    return value.value;
  } else {
    return value;
  }
}

// will parse with success if all values can be represented with a number
let json = LosslessJSON.parse("[1,2,3]", convertLosslessNumber);
console.log(json); // [1, 2, 3] (regular numbers)

// will throw an error when some of the values are too large to represent correctly as number
try {
  let json = LosslessJSON.parse("[1,2e+500,3]", convertLosslessNumber);
} catch (err) {
  console.log(err); // throws Error Cannot convert to number: number would overflow
}
```
