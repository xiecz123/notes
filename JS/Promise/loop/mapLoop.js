const {
  fruitsToGet,
  getNumFruit
} = require("./base");

// 如果在map中使用await, map 始终返回promise数组，这是因为异步函数总是返回promise。
const mapLoop1 = async _ => {
  console.log('Start')
  const numFruits = await fruitsToGet.map(async fruit => {
    const numFruit = await getNumFruit(fruit);
    return numFruit;
  })
  
  console.log(numFruits);

  console.log('End')
}


// 如果你在 map 中使用 await，map 总是返回promises，你必须等待promises 数组得到处理。 或者通过await Promise.all(arrayOfPromises)来完成此操作。
const mapLoop2 = async _ => {
  console.log('Start');

  const promises = fruitsToGet.map(async fruit => {
    const numFruit = await getNumFruit(fruit);
    return numFruit;
  });

  const numFruits = await Promise.all(promises);
  console.log(numFruits);

  console.log('End')
}


// 如果你愿意，可以在promise 中处理返回值，解析后的将是返回的值。
const mapLoop3 = async _ => {
  console.log('Start');

  const promises = fruitsToGet.map(async fruit => {
    const numFruit = await getNumFruit(fruit);
    return numFruit + 100;
  });

  const numFruits = await Promise.all(promises);
  console.log(numFruits);

  console.log('End')
}

mapLoop1()
mapLoop2()
mapLoop3()