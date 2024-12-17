'use strict'
// enumerable可枚举
// const objProto = {
//   'test-proto': '原型属性'
// }

// var obj = Object.assign(Object.create(objProto), {
//   b: 2,
//   [Symbol(1)]: 'symbol'
// })

// Object.defineProperty(obj, 'a', {
//   value: 1,
//   writable: true,
//   configurable: true,


//   enumerable: true,
// })

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
// Object.keys(obj)
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

// Object.preventExtensions()
// Object.
// Object.isExtensible() 判断对象是否可以扩展
// var objProto = {
//   test: 2
// }
// var obj1 = Object.assign({
//   b: 2
// }, Object.create(objProto)) 
// const obj2 = Object.preventExtensions(obj1)
// console.log(obj1 === obj2)
// 无法扩展，直接报错TypeError
// Object.defineProperty(obj1, 'a', {
//   value: 1
// })
// Object.defineProperty(obj2, 'a', {
//   value: 1
// })

// Object.isExtensible(obj1)+

// 调用preventExtensions()后，Object.isExtensible()返回false
// console.log("🚀 ~ Object.isExtensible(obj1):", Object.isExtensible(obj1))

// 严格模式下添加新属性也会报错 TypeError
// obj1.a = '1'
// 修改已有的属性是可以的
// obj1.b = 3
// 使用Object.defineProperty()修改已有属性的属性描述符是可以的
// Object.defineProperty(obj2, 'b', {
//   // value: 3,
//   // writable: false,
//   get() {
//     return 1
//   },
//   // set() {
//   //   return true
//   // },
//   enumerable: true,
//   configurable: true
// })

// console.log("🚀 ~ obj2:", obj2)


// 不能修改禁止扩展对象的原型， __proto__
// obj1.__proto__ = {}

// 非对象参数原样返回,不会报错
// const oValue = Object.preventExtensions(1);

// console.log("🚀 ~ oValue:", oValue)

// 对象被Object.preventExtensions()后
// 1.Object.isExtensible()为false
// 2.不能添加新属性，直接新增或者通过Object.defineProperty()都是不可以的
// 3.但是可以修改属性值 (直接修改或者通过Object.defineProperty修改都是可以的)
// 4.对象的原型指向是不能修改的，obj.__proto__指向不能修改
// 5.传入非对象不会报错，而是返回非对象值(也就是原始类型)


// Object.seal(), 返回被密封的对象
// 等价于对对象调用Object.preventExtensions(),并且将现有的属性描述符的configurable改为false
// const obj = {
//   a: 1
// }
// // 如果已有属性的configurable为false，调用seal也是不会报错的
// Object.defineProperty(obj ,'b', {
//   value: 2,
//   configurable: false
// })
// Object.seal(obj)
// Object.isExtensible(obj)
// Object.getOwnPropertyDescriptors(obj)

// console.log("🚀 ~ Object.getOwnPropertyDescriptors(obj):", Object.getOwnPropertyDescriptors(obj))


// Object.freeze()
// 等价于对对象调用Object.preventExtensions(),然后把现有的属性描述符的writable设置为false
// 如果使用Object.defineProperty()定义时使用访问器描述符，那么还是可以修改该属性的值
const obj = {
  a: 1
}


var value = 1
Object.defineProperty(obj, 'b', {
  get() {
    return value
  },
  set(nVal) {
    value = nVal
    return true
  },
})
Object.freeze(obj)

console.log("🚀 ~ obj:", Object.getOwnPropertyDescriptors(obj))
obj.b = 2
console.log("🚀 ~ obj:", obj.b)

// 会报错，因为writable为false
obj.a = 4




