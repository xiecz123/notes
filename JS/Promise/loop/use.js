const fruitBasket = {
  apple: 27,
  grape: 0,
  pear: 14,
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const getNumFruit = (fruit) => {
  const a = sleep(1000).then((v) => fruitBasket[fruit]);
  console.log("getNumFruit", a);
  return a;
};
async function useuse() {
  const a = await getNumFruit("apple");
  console.log("useuse", a);
}

useuse();
