let promise = new Promise((resolve, reject) => {
  resolve('cuowu')
})

promise.then(res => {
  console.log("1", res)
}).catch(err => {
  console.log("2", err)
  return err
}).then(res => {
  console.log("3", res)
}, err => {
    console.log("4", err)
})