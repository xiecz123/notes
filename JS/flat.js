// 这个方法直接改变传入的数据
// 将所有key展平到第一层
// 第二个参数为需要展平的key
// 第三个参数为是否需要删除key
function flatData(data, key = 'children', isDelete = false) {
  let i = 0
  while (i < data.length) {
    const item = data[i]
    if (item[key] && item[key].length > 0) {
      data.push(...item[key])
    }
    if (isDelete) {
      delete item[key]
    }
    i++
  }
  console.log(data)
  return data
}

const flatTreeData = (treeData, children = 'children', isClone = false) =>
  treeData.reduce((acc, o) => ((acc.push(isClone ? deepClone(o) : o) && o[children] && (acc = acc.concat(flatTreeData(o[children]))), acc)), [])

const data = [{
  id: 1,
  children: [{
    id: 10,
    children: [{
      id: 100,
      children: []
    }, {
      id: 101,
      children: []
    }, {
      id: 102,
      children: []
    }]
  },
  {
    id: 11,
    children: []
  },
  {
    id: 12,
    children: []
  }
  ]
}, {
  id: 2,
  children: [{
    id: 20,
    children: []
  },
  {
    id: 21,
    children: []
  },
  {
    id: 22,
    children: []
  }
  ]
},
{
  id: 3,
  children: []
}
]

let res = flatTreeData(data)
console.log(res)
console.log(data)
console.log(res[1] === data[0].children[0])