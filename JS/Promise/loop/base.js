const fruitBasket = {
  apple: 27,
  grape: 0,
  pear: 14,
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const getNumFruit = (fruit) => {
  return sleep(1000).then((v) => fruitBasket[fruit]);
};

const fruitsToGet = ["apple", "grape", "pear"];

module.exports = {
  sleep,
  fruitsToGet,
  getNumFruit,
};
