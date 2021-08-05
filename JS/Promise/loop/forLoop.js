const {
  sleep,
  fruitsToGet,
  getNumFruit
} = require("./base");

const forLoop = async _ => {
  console.log('start');

  for (let index = 0; index < fruitsToGet.length; index ++) {
    const fruit = fruitsToGet[index];
    const numFruit = await getNumFruit(fruit);
    await sleep(5000)
    console.log(numFruit);
  }
  console.log('End')
}

forLoop()
