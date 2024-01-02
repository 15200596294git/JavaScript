// function foo(a) {
//   var b  = a
//   return a + b
// }

// var c = foo( 2 )

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
// setTimeout('var b = 2', 1000);
// setTimeout(() => {
//   console.log(b)
// }, 2000);

// var a = 2;

// (function foo() {
//   var a = 3
//   console.log(a);
// })()
// 函数表达式只能在他声明的作用域中访问
// console.log(foo);

// function foo() {
//   console.log(1);
// }

// function foo() {
//   console.log(2);
// }

// foo() // 2
// 函数声明的提升，后面的会覆盖前面的

/**
 * ----------------------------- 作用域闭包
 */
/* function foo() {
  var a = 2

  // foo的内部函数
  // 引用了foo的内部变量a
  function bar() {
    console.log(a);
  }
  return bar
}

var fn = foo()
// 此时foo的内部函数bar的引用给到了fn
// 我们在bar函数本身的词法作用域之外调用,它也能正确的访问到变量a
fn()
 */

// for(let i = 1; i <=5; i++) {
//   setTimeout(() => {
//     console.log(i);
//   }, i * 1000);
// }

/* var MyModules = (function () {
  var modules = {};

  function define(name, deps, impl) {
    for (var i = 0; i < deps.length; i++) {
      deps[i] = modules[deps[i]];
    }
    modules[name] = impl.apply(impl, deps);
  }

  function get(name) {
    return modules[name];
  }

  return {
    define,
    get,
  }
})();
 */
// modules['bar'] = {hello}

/* function foo() {
  console.log(a);
}

function bar() {
  var a = 3
  foo()
}
var a = 2
bar() */


/**
 * ----------------------------- 作用于闭包
 */

/**
 * ----------------------------- 作用于闭包
 */

/**
 * ----------------------------- 作用于闭包
 */
