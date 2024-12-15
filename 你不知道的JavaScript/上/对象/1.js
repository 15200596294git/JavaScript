// 可计算属性名
// const prefix = 'foo'
// const obj = {
//   [prefix + 'jg']: 1,
//   [prefix + 'jg2']: 2
// }

// console.log("🚀 ~ obj['foojg']:", obj['foojg'])

// console.log("🚀 ~ obj['foojg2']:", obj['foojg2'])


// var arr = [1,2]
// 为数组添加一个看起来像数字的属性，会当作往数组里面添加内容，对应的lengt也会变化
// arr['3'] = 3
// console.log(arr.length, arr[3]);
// console.log(arr[2]);

// Object.assign(target, ...source)
// var obj1 = {
//   a: 1
// }
// var obj = Object.assign(obj1, {a: 1}, {a: 2, b: 3} )
// console.log("🚀 ~ obj:", obj)
// console.log("🚀 ~ obj1:", obj1)
// console.log(obj1 === obj)

// Object.assign的第一个参数可以是对象子类型，对象数组函数正则都可以
// 如果是对象就是右边覆盖左边的key，如果是数组就是右边下标覆盖左边的下标
// var arr = Object.assign(function() {}, [1,2], [,,3,4], null, undefined)
// console.log("🚀 ~ arr:", arr)

// 属性描述符,分为两种类型
// 1.数据描述符 value + writable
// 2.访问器描述符 getter + setter
// var obj = {
//   a: 1
// }

// // var d = Object.getOwnPropertyDescriptor(obj, 'a')
// // console.log("🚀 ~ d:", d)

// Object.defineProperty(obj, 'b', {
//   value: 2,
//   // writable: true,
//   // enumerable默认值为false，如果为false
//   // 那么也就是在循环的时候，是访问不到找个属性的
//   // 直接用console.log()打印的时候，也是打印不出来这个属性的
//   enumerable: false,

//   // 如果既定义了value又定义了get,那么就会报错TypeError
//   get() {
//     return 'a'
//   }
// })
// // 严格模式下对不可写的属性进行修改，会报错TypeError
// obj.b = 3
// console.log(obj)

// configurable
// 如果configurable变成了false
//   那么就不能再把configurable改为true， 也不能修改enumerable的值
//   但是如果使用Object.defineProperty时，configurable和enumerable两者前后的值是一样的，是不会报错的
// 并且如果configurable为false
//   数据描述符和访问器描述符之间也是不能更改的，反之则可以更改
// 如果configurable为false
//   并且为访问器描述符时，get和set也是不能更改的，但是如果前后传入的函数的引用是一样的话是不会报错的，但也是符合前面说的，不能更改
// 如果configurable为false
//   writable只能从true改为false，不能从false改为true
// 如果configurable为false
//   delete语句也无法删除该属性，会静默失败


const obj = {}
const propertyGet = function() {
  return 1
}
// 
Object.defineProperty(obj, 'a', {
  value: 1,
  writable: false,
  // get() {
  //   return 1
  // },
  // set() {},
  enumerable: true,
  // configurable: true,
  // 为false不需要定义，默认就是false
  configurable: false
})

// 不可配置时，尝试用defineProperty修改属性a的描述符
Object.defineProperty(obj, 'a', {
  // value:2,
  // writable: true,
  // value: 3,
  // get() {
  //   return 1
  // },
  // enumerable: true,
  // configurable: false
})

delete obj.a
console.log(obj.a);
console.log(Object.getOwnPropertyDescriptor(obj, 'a'))
 