const {
  fruitsToGet,
  getNumFruit
} = require("./base");

const forEachLoop = _ => {
  console.log('Start');

  fruitsToGet.forEach(async fruit => {
    const numFruit = await getNumFruit(fruit);
    console.log(numFruit)
  });

  console.log('End')
}

//JavaScript 中的 forEach不支持 promise 感知，也不支持 async 和await，所以不能在 forEach 使用 await 。
forEachLoop()
