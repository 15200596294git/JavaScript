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

/* const myModules = (function defineModule() {
  const _modules = {}

  function define(name, deps, fn) {
    const depsModule = deps.map((name)=> {
      return _modules[name]
    })
    _modules[name] = fn.apply(fn, depsModule)
  }
  function getModule(name) {
    return _modules[name]
  }
  return {
    define,
    getModule,
  }
})()

myModules.define('foo', [], function() {
  function hello(name) {
    return `Hello ${name}`
  }

  return {
    hello,
  }
})
myModules.define('bar', ['foo'], function(foo) {
  function awesome() {
    console.log(foo.hello('jg').toUpperCase())
  }

  return {
    awesome
  }
})

const foo = myModules.getModule('foo')
const bar = myModules.getModule('bar')

bar.awesome() */

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

// this绑定规则
// 1.默认绑定 独立函数调用
/* function foo() {
  console.log(this.a);
}
var a = 2
foo() // 2 */
// foo是直接使用不带任何修饰的函数引用进行调用的，因此只能是默认绑定，无法应用其他规则

// 2.隐式绑定 调用位置是否有上下文对象
// 对象属性引用中只有最后一层会影响调用位置
/* function foo() {
  console.log(this.a)
}
var obj2 = {
  a: 42,
  foo,
}
var obj1 = {
  a: 2,
  obj2
}
obj1.obj2.foo()  */ // 42 foo的this指向最后一层的调用，也就是obj2
// 隐式丢失
/* function foo() {
  console.log(this.a);
}
var obj = {
  a: 2,
  foo,
}
var bar = obj.foo
var a = 'oops,global'
bar() // oops,global bar其实只是引用了foo函数，然后调用的时候是不加任何修饰的调用，所以bar的this指向window
 */
// 3.显示绑定
// function foo() {
//   console.log(this.a);
// }
// var obj = {
//   a: 2
// }
// foo.call(obj)

// 4.new绑定
// 使用new
// 1.创建一个全新的对象
// 2.这个新对象会被执行[[原型]]连接
// 3.这个新对象会绑定到函数调用的this
// 4.如果函数没有返回其他对象，那么new表达适中的函数调用会自动返回这个新对象
// function foo(a) {
//   this.a = a
// }
// const bar = new foo(2)
// console.log(bar.a);

// new绑定优先级 > 显示绑定 > 隐式绑定 > 默认

// 1. 函数是否在 new 中调用（new 绑定）？如果是的话 this 绑定的是新创建的对象。
// var bar = new foo()
// 2. 函数是否通过 call、apply（显式绑定）或者硬绑定调用？如果是的话，this 绑定的是
// 指定的对象。
// var bar = foo.call(obj2)
// 3. 函数是否在某个上下文对象中调用（隐式绑定）？如果是的话，this 绑定的是那个上
// 下文对象。
// var bar = obj1.foo()
// 4. 如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到 undefined，否则绑定到
// 全局对象。
// var bar = foo()

// softBind软绑定
// 可以绑定一个上下文对象，返回一个函数
// 该函数调用时如果this为默认的this，那就用最开始传入的上下文对象，否则用传入的this(call或者隐式的this)
if (!Function.prototype.softBind) {
  Function.prototype.softBind = function (defaultContext, ...args) {
    const fn = this;
    // context =

    function wrapper(...args2) {
      console.log("this", this);
      const context = !this || this === globalThis ? defaultContext : this;
      return fn.apply(context, args.concat(args2));
    }

    return wrapper;
  };
}

// 软绑定
/* function foo() {
  console.log('name: '+ this.name);
}
function add(a,b,c) {
  return a + b + c
}

var obj = {name: 'obj'},
    obj2 = {name: 'obj2'},
    obj3 = {name: 'obj3'} */

// var fooOBJ = foo.softBind(obj)
// fooOBJ() // name: obj

// obj2.foo = foo.softBind(obj)
// obj2.foo() // obj2
// fooOBJ.call(obj3) // obj3
// setTimeout(obj2.foo, 1000); // obj/

// setTimeout( obj2.foo, 500); /// 3

// var add1 = add.softBind(null, 1)
// console.log(add1(2,3))

// 工具函数，创建枚举状态
// 根据下标获取对应的值，根据下标获取对应的key
// 根据id获取label，根据label获取id

function wrapperArray(arr) {
  if(!arr.length) {
    throw Error('arr 数组不能为空')
    // return
  }
  const ret = {}
  const firstItem = arr[0]
  Object.keys(firstItem).forEach((k) => {
    ret[k] = (value) => {
      const index = arr.findIndex((dataItem) => dataItem[k] === value);
      return {
        get: (idt) => {
          if (idt === "index") {
            return index;
          }

          if (idt === "value") {
            return arr[index];
          }
        },
      };
    };
  });

  return ret
}

const userList = [
  { id: 1, name: "Mike" },
  { id: 2, name: "Jack" },
  { id: 3, name: "Bruce" },
];

const wrapped = wrapperArray(userList);

// 对应的key的函数，传入对应的值，返回找到
const ret1 = wrapped.id(1).get("index"); // 获取id为1的项的下标
const ret2 = wrapped.id(1).get("value"); // 获取id为1的项的值
const ret3 = wrapped.name("Mike").get("index"); // 获取name为Mike的值的下标

console.log(ret1, ret2, ret3);

// 项目里经常使用findIndex做一些查询操作
// 可以封装成一个函数，然后类似上面调用
console.log(wrapperArray(userList).id(3).get("index"));



