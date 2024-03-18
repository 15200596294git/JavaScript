// function foo() {
//   console.log('foo');
// }
// foo()

// (function foo() {
//   console.log('foo')
// })()

// (function IIFE(def) {
//   def(window)
// })(function def(global) {
//   // do something
// })

// 闭包
// JavaScript中闭包无处不在，你只需要能够识别并拥抱它。
// 闭包并不是一个需要学习新的语法或模式才能使用的工具

// 闭包是基于词法作用域书写代码时所产生的自然结果，你甚至不需要为了利用它们而有意
// 识地创建闭包。闭包的创建和使用在你的代码中随处可见。你缺少的是根据你自己的意愿
// 来识别、拥抱和影响闭包的思维环境。

// 闭包的定义 当函数可以记住并访问所在的词法作用域时，就产生了闭包，即使函数是在当前词法作用
// 域之外执行。

//词法作用域：简单来说，词法作用域是指在词法阶段就已经确定好的作用域，也即是由代码位置来决定变量和作用域的指向，不会在运行期间改变（eval函数除外）。

// for(let i = 1; i <= 5; i ++) {
//   (function(i) {
//     setTimeout(()=> {
//       console.log(i);
//     }, i * 500)
//   })(i)
// }

// const myModules = (function defineModule() {
//   const _modules = {}

//   function define(name, deps, fn) {
//     const depsModule = deps.map((name)=> {
//       return _modules[name]
//     })
//     _modules[name] = (...args)=> fn.apply(fn, depsModule.concat(args))
//   }
//   function getModule(name) {
//     return _modules[name]
//   }
//   return {
//     define,
//     getModule,
//   }
// })()

// myModules.define('foo', [], function(name) {
//   return `Hello ${name}`
//   // return ''
// })
// myModules.define('bar', ['foo'], function(foo) {
//   console.log(foo('jg'))
// })

// const foo = myModules.getModule('foo')
// const bar = myModules.getModule('bar')

// bar()


// var MyModules = (function Manager() {
//   var modules = {};
//   function define(name, deps, impl) {
//     for (var i = 0; i < deps.length; i++) {
//       deps[i] = modules[deps[i]];
//     }
//     modules[name] = impl.apply(impl, deps);
//   }
//   function get(name) {
//     return modules[name];
//   }
//   return {
//     define: define,
//     get: get
//   };
// })();

// MyModules.define("bar", [], function () {
//   function hello(who) {
//     return "Let me introduce: " + who;
//   }
//   return {
//     hello: hello
//   };
// });
// MyModules.define("foo", ["bar"], function (bar) {
//   var hungry = "hippo";
//   function awesome() {
//     console.log(bar.hello(hungry).toUpperCase());
//   }
//   return {
//     awesome: awesome
//   };
// });
// var bar = MyModules.get("bar");
// var foo = MyModules.get("foo");
// console.log(
//   bar.hello("hippo")
// ); // Let me introduce: hippo
// foo.awesome(); // LET ME INTRODUCE: HIPPO
