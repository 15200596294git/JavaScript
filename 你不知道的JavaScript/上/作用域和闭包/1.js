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
function foo(obj) {
  with(obj) {
    a = 2
  }
}

var obj1 = {
  a: 1
}
var obj2 = {
  b: 2
}

// foo(obj1)
// obj2中没有a属性，所以当在函数foo中的with语句中时，会逐级查找a的LHS引用，发现找不到
// 就会在全局新建一个，而不是修改传入的obj的属性,因此意外的创建了一个全局变量
foo(obj2)
// console.log(obj1);
console.log(obj2);
// console.log(a);