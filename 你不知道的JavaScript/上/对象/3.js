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
// var objProto = {
//   b: 2
// }
// const obj = Object.assign(Object.create(objProto), {
//   a: 1
// })

// in会检查原型链
// "b" in obj
// Object.hasOwn()只会检查当前对象是否有该属性，不会检查到原型链
// Object.hasOwn(obj, 'b')

// console.log('🚀 ~ "a" in obj:','b' in obj)


// var arr = [1,2,3,4]
// for(var item of arr) {
//   console.log(item)
// }
// const it = arr[Symbol.iterator]()
// console.log(it);
// it.next()

// console.log('🚀 ~ it.next():', it.next())

// Object，没有迭代器
// const obj = {
//   a: 1,
//   b: 2,
//   c: 3,
// }
// // 为obj自定义Symbol.iterator属性
// // value为一个函数，这个函数返回一个对象
// // 对象包含一个next函数，每次调用next返回value和done两个值
// Object.defineProperty(obj, Symbol.iterator, {
//   value() {
//     const obj = this
//     const keys = Object.keys(this)
//     let keyIndex = 0
    
//     return {
//       next() {
//           const isDone = keyIndex > keys.length - 1
//           return {
//             value: obj[keys[keyIndex++]],
//             done: isDone
//           }
//         }
//       }
    
//   },
//   writable: false,
//   enumerable: false,
//   configurable: false
// })

// var it = obj[Symbol.iterator]()

// console.log('🚀 ~ it:', it.next())

// for(var item of obj) {
//   console.log(item);
// }

const randoms = {
  [Symbol.iterator]() {

    return {
      next() {
        return {
          value: Math.random(),
          done: false
        }
      }
    }
  }
}


var arr = []
for (var item of randoms) {
  arr.push(item)
  if(arr.length >= 1000) break;
}
console.log(arr);


