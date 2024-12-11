// 欺骗词法
// eval 

// function foo(a, str) {
//   eval(str) // 欺骗
//   console.log(a, b);
// }

// var b = 2
// foo(1, 'var b = 3;')


// 严格模式下的eval
// function foo(str) {
//   'use strict'
//   eval(str)
//   console.log(b); // ReferenceError
// }


// foo('var b = 2;')


// with
// function foo(obj) {
//   with(obj) {
//     a = 2
//   }
// }

// var obj1 = {
//   a: 1
// }
// var obj2 = {
//   b: 2
// }

// // foo(obj1)
// // obj2中没有a属性，所以当在函数foo中的with语句中时，会逐级查找a的LHS引用，发现找不到
// // 就会在全局新建一个，而不是修改传入的obj的属性,因此意外的创建了一个全局变量
// foo(obj2)
// // console.log(obj1);
// console.log(obj2);
// // console.log(a);

// 函数表达式和和函数声明
// 这里的function handle是一个函数表达式
// 所以在全局作用域下无法对它进行访问
// setTimeout(function handle() {

// }, 1000);
// handle()


// IIFE
// IIFE函数会先执行，并且接受一个参数为函数
// 然后再调用这个函数，这个函数也是一个函数表达式，也不会在全局作用域下
// (function IIFE(def) {
//   console.log('IIFE');
//   def(2)
// })(function def(a) {
//   console.log('def')
//   console.log(a,'a')
// })


// {
//   // console.log(a)
//   const a = 1
//   a = 2
// }

// 这是函数表达式
// foo() // 此时无法调用，因为表达式不会提升
// var foo = function () {}
// 这是函数声明，整个函数都会提升到当前作用域的最上方，也就是全局作用域
// foo()
// function foo() {
//   console.log('foo')
// }

// var foo = function bar() {
//   console.log('bar', bar)
// }


// 经典循环+定时器
for(var i = 1; i <= 5; i ++) {
  (function(i) {
    // console.log(j);
    
    setTimeout(function(){
      console.log(i)
    }, 500 * i)
  })(i)
}