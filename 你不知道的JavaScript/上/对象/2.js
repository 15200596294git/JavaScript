// enumerable可枚举
const objProto = {
  'test-proto': '原型属性'
}

var obj = Object.assign(Object.create(objProto), {
  b: 2,
  [Symbol(1)]: 'symbol'
})

Object.defineProperty(obj, 'a', {
  value: 1,
  writable: true,
  configurable: true,


  enumerable: true,
})

// obj.propertyIsEnumerable('a')
// console.log("🚀 ~ obj.propertyIsEnumerable('a'):", obj.propertyIsEnumerable('a'))
// obj.hasOwnProperty('a')
// console.log("🚀 ~ obj.hasOwnProperty('a'):", obj.hasOwnProperty('a'))
// Object.hasOwn(obj, 'a')
// console.log("🚀 ~ Object.hasOwn(obj, 'a'):", Object.hasOwn(obj, 'a'))
// 'a' in obj
// console.log("🚀 ~ a in obj:", 'a' in obj)

// Object.prototype.propertyIsEnumerable()
// Object.prototype.hasOwnProperty()  (Object.hasOwn()用来替代它的)
// in 属性是否在对象或者对象的原型链中

// 属性描述符enumerable，在上述中只影响propertyIsEnumerable的值，这个值是布尔值
// 和该属性的属性描述符中的enumerable的值一样

/**
 * 对遍历的影响
 */
Object.keys(obj)
// Object.keys() 返回的是该对象自有的(Object.hasOwn())、可枚举的(enumerable)属性所组成的数组
// console.log("🚀 ~ Object.keys(obj):", Object.keys(obj))

// Object.values(obj) 同上
// console.log("🚀 ~ Object.values(obj):", Object.values(obj))

// Object.entries(obj) 同上
// console.log("🚀 ~ Object.entries(obj):", Object.entries(obj))

// 获取自有属性组成的数组，但是无法获取属性为symbol 和enumerable无关
// Object.getOwnPropertyNames(obj)
// console.log("🚀 ~ Object.getOwnPropertyNames(obj):", Object.getOwnPropertyNames(obj))


// 专门获取对象的symbol属性，返回由symbol属性组成的数组
// Object.getOwnPropertySymbols(obj)
// console.log("🚀 ~ Object.getOwnPropertySymbols(obj):", Object.getOwnPropertySymbols(obj))

// 获取对象的所有自有属性的描述符(不是继承而来的属性)
// Object.getOwnPropertyDescriptors(obj)
// console.log("🚀 ~ Object.getOwnPropertyDescriptors(obj):", Object.getOwnPropertyDescriptors(obj))


// 前面的getOwnPropertyNames() 和 getOwnPropertySymbols()的组合数据
// Reflect.ownKeys(obj)
// console.log("🚀 ~ Reflect.ownKeys(obj):", Reflect.ownKeys(obj))

// for in
// 遍历的属性为自有可枚举、继承可枚举
// for (let k in obj) {
//   console.log(k)
// }
// for in想要判断属性是否为自有，只需要加上 Object.hasOwn()就行了

// Object.assign()
// 第二个参数或者更多，复制的是他们的自有的可枚举的属性，如果属性为不可枚举是不会复制的
// const obj2 = Object.assign({}, obj)
// console.log("🚀 ~ obj2:", obj2)


// 展开语法 Spread syntax
// 感觉就类似Object.assign()
// const obj2 = {
//   ...obj
// }
// console.log("🚀 ~ obj2:", obj2)
