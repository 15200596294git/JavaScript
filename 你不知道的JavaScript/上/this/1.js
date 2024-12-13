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
function foo() {
  console.log("🚀 ~ foo ~ this.a:", this.a)
}

var a = 'global'
var obj = {
  a: 1,
  foo
}

var foo2 = obj.foo
// 看调用，foo2是直接拿到foo函数的引用，然后不带修饰的调用，那就是默认调用
foo2()

function cb(fn) {
  fn()
}
// 此时也是相当于传入函数的引用
// 然后在cb函数内部，也是对传入的函数不带修饰的调用，那也就是应用到默认规则
cb(obj.foo)



