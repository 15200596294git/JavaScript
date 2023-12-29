function foo(a) {
  var b  = a
  return a + b
}

var c = foo( 2 )

/**
 * 引擎: 我要对foo函数进行RHS引用
 * 作用域: 好的，给你
 * 引擎: 大哥，我要对变量a进行LHS引用
 * 作用域: 没问题，在这呢
 * 引擎: 大哥再帮个忙，我需要b的LHS引用和a的RHS引用，再把a的值赋值给b
 * 作用域: 没问题，都给你办妥了
 * 引擎: 再帮我找到a的RHS和b的RHS
 * 作用域: ok了
 * 引擎: 最后把函数的返回值赋值给c
 */

/**
 * 找出所有的LHS查询
 * 函数调用时，赋值给形参 a = 2
 * var b = a 对b的LHS
 * var c = foo( 2 ) 对c的LHS
 */

/**
 * 找出所有的RHS查询
 * foo(2)
 * var b = a 对a的RHS
 * a + b a的RHS
 * a + b b的RHS
 */

// eval 欺骗词法
// function foo(str, a) {
//   eval(str)
//   console.log(a, b); // 1, 3
// }
// var b = 2
// foo('var b = 3;', 1)

//
setTimeout('var b = 2', 1000);
setTimeout(() => {
  console.log(b)
}, 2000);
