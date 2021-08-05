let arr = [1000, 1001, 1002];

async function forOf() {
  for (let i = 0; i < arr.length; i++) {
    const res = await yibu(arr[i]);
    console.log(res);
  }
  for (const time of arr) {
    const res = await yibu(time);
    console.log(res);
  }
}

function yibu(time) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve(time);
    }, time);
  });
}

forOf();
