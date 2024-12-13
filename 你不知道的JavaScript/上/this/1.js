// this的绑定规则
// 1.默认绑定 不符合其他三条规则，就是默认绑定
// function foo() {
//   console.log('a', this.a);
// }

// var a = 1

// // 严格模式下此时foo中的this指向的是undefined
// // 非严格模式下此时foo中的this指向的是window
// foo()


// 2.隐式绑定
// function foo() {
//   console.log("🚀 ~ foo ~ this.a:", this.a)
// }

// const obj = {
//   a: 2,
//   foo
// }
// 此时的调用是一个隐式绑定，foo函数中的this绑定到了obj对象上
// obj.foo()

// obj.obj2 = obj2
// var obj2 = {
//   a: 3, 
//   foo
// }

// 此时foo中的this指向的是obj2对象
// 对象引用链中，只有调用函数前的那个对象影响函数调用位置
// 也就是说不管这个函数的调用前面有多少个对象，之前它前面的第一个影响函数内部this的指向
// obj.obj2.foo()

// 隐式丢失，那就是在一般的回调函数的时候，会丢失
// function foo() {
//   console.log("🚀 ~ foo ~ this.a:", this.a)
// }

// var a = 'global'
// var obj = {
//   a: 1,
//   foo
// }

// var foo2 = obj.foo
// 看调用，foo2是直接拿到foo函数的引用，然后不带修饰的调用，那就是默认调用
// foo2()

// function cb(fn) {
//   fn()
// }
// 此时也是相当于传入函数的引用
// 然后在cb函数内部，也是对传入的函数不带修饰的调用，那也就是应用到默认规则
// cb(obj.foo)

// 3.显示绑定
// function foo() {
//   console.log('this', this);
  
//   // console.log(this.a);
// }
// const obj = {
//   a: 2
// }
// 如果传入的是一个原始类型，那么会转成它的对象形式
// 比如字符串转为new String(), 数字转为new Number()
// foo.call('')

// 硬绑定
// 可以使用一个包裹函数来固定函数的this指向
// function foo(value) {
//   console.log(this.a, value);
  
// }
// var obj = {
//   a: 2
// }
// function wrapFn(...args) {
//   foo.apply(obj, args)
// }
// 因为wrapFn中是固定了foo的this指向，所以无论该函数如何调用，里面的foo的this指向都是不会变的
// wrapFn.call({a: 5}, 3)

// 也可以使用bind
// const wrapFn = foo.bind(obj)
// 此时foo函数的this指向也固定了
// wrapFn.call({a: 5}, 3)

// 4.new绑定
// 使用new来调用函数时，会自动指向下面的操作
// 创建一个全新的对象
// 这个新对象会被执行[[原型]]连接
// 这个新对象会绑定到函数调用的this
// 如果函数没有返回其他对象，那么函数会自动返回这个新对象

// function foo(a) {
//   this.a = a
// }

// const bar = new foo(2)
// bar.a

// console.log("🚀 ~ bar.a:", bar.a)


// 被忽略的this
function foo(value) {
  this.a = value
}
const obj = {
  foo
}
// 当使用obj.foo调用函数时，foo函数内的this指向的是obj
// 但是如果在后面再加上一个call，并且把this指向到null，这时会把原本指向obj的this变成this的默认规则(window或者undefined)
// 也就是说这个应该不叫忽略，而是通过call、apply、bind把this修改为默认规则
obj.foo.call(null, 3)
console.log(obj.a);
console.log(a);
