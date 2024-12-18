// 直接给对象定义get(不使用Object.defineProperty())
// 不过这样定义的话，如果没有定义setter，那么对属性的赋值将不会生效
// var obj = {
//   get a() {
//     return 2
//   },
//   get b() {
//     return this.a * 2
//   }
// }



// console.log('🚀 ~ obj:', Object.getOwnPropertyDescriptors(obj))
// // 由于没有定义setter，所以赋值失效
// obj.a = 4

// console.log('🚀 ~ obj.a:', obj.a)


// var obj = {
//   get a() {
//     return this._a_
//   },
//   set a(val) {
//     this._a_ = val * 2
//   }
// }

// obj.a = 2

// console.log('🚀 ~ obj.a:', obj)

// 存在性，判断属性是否存在对象中
var objProto = {
  b: 2
}
const obj = Object.assign(Object.create(objProto), {
  a: 1
})

// in会检查原型链
"b" in obj
// Object.hasOwn()只会检查当前对象是否有该属性，不会检查到原型链
Object.hasOwn(obj, 'b')

console.log('🚀 ~ "a" in obj:','b' in obj)

