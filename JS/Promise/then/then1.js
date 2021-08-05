Promise.resolve("foo")
  // 1. 接收 "foo" 并与 "bar" 拼接，并将其结果做为下一个 resolve 返回。
  .then(function (string) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        string += 'bar';
        console.log('第一个')
        resolve(string);
      }, 2000);
    });
  })
  // 2. 接收 "foobar", 放入一个异步函数中处理该字符串
  // 并将其打印到控制台中, 但是不将处理后的字符串返回到下一个。
  .then(function (string) {
    setTimeout(function () {
      string += 'baz';
      console.log("第二个", string);
      return string;
    }, 2000)
  })
  // 3. 打印本节中代码将如何运行的帮助消息，
  // 字符串实际上是由上一个回调函数之前的那块异步代码处理的。
  .then(function (string) {
    // 注意 `string` 这时不会存在 'baz'。
    // 因为这是发生在我们通过setTimeout模拟的异步函数中。
    console.log('第三个', string);
  });