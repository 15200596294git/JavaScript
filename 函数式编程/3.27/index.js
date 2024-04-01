import _ from "underscore";

function splat(fun) {
  return function (array) {
    return fun.apply(null, array);
  };
}

function foo(a, b) {
  return a + b;
}
var addArrayElements = splat(foo);

addArrayElements([1, 2]);
/**
 * 接收参数fun，参数类型为函数
 * 返回值为一个函数，这个函数将所有的参数收集为一个数组，返回并调用传入的fun，将收集的参数传入fun
 * @param {Function}
 * @returns {Function}
 */
function unsplat(fun) {
  return function (...args) {
    return fun.call(null, args);
  };
}
// 接收一个参数为数组，调用数组的join方法，并以' '分割
// 返回一个字符串
function foo2(array) {
  return array.join(" ");
}
var joinArrayElements = unsplat(foo2);
joinArrayElements(1, 2);
function isString(value) {
  return typeof value === "string";
}

function isNumber(value) {
  return typeof value === "number";
}

function isArray(value) {
  return Array.isArray(value);
}

function fail(thing) {
  throw new Error(thing);
}
function warn(thing) {
  console.log(["WARNING:", thing].join(" "));
}
function note(thing) {
  console.log(["NOTE:", thing].join(" "));
}

function parseAge(age) {
  if (!isString(age)) {
    fail(`Expecting a string, but ${JSON.stringify(age)}`);
  }

  note("尝试解析 age");
  let _age = parseInt(age);
  if (isNaN(_age)) {
    _age = 0;
    warn(["不能解析变量age", age].join(" "));
  }

  return _age;
}
// parseAge(1)
// parseAge([])
// parseAge('a1')
// parseAge('1')

function isIndexed(value) {
  return isString(value) || isArray(value);
}

/**
 * 接收一个数组和一个索引，返回对应的值
 * a必须是有索引的数据类型-Array或者String
 * index必须为Number类型
 * index必须 大于等于0 并且 <= a.length - 1
 */
function nth(a, index) {
  const aType = isIndexed(a); // 必须为字符串或者数组
  const isINumber = isNumber(index); // 索引必须为数字
  const isInnerOf = index >= 0 && index <= a.length - 1; // 索引在范围之内

  if (!aType) {
    fail(`Expect a String or an Array, but ${typeof a}, ${JSON.stringify(a)}`);
  }

  if (!isINumber) {
    fail(`Expect a Number, but ${typeof index}, ${JSON.stringify(index)}`);
  }

  if (!isInnerOf) {
    fail(`Out of bounds, ${JSON.stringify(index)}`);
  }

  return a[index];
}
var letters = ["a", "b", "c"];
// nth(letters, 1)
// function first(a) {
//   return nth(a, 0);
// }

// first(letters)
// first('abc')
// var arr = [2, 3, -1, -6, 0];

function lessOrEqual(x, y) {
  return x <= y;
}
function comparator(prev) {
  return function (x, y) {
    if (prev(x, y)) {
      return -1;
    }
    if (prev(y, x)) {
      return 1;
    }

    return 0;
  };
}
// arr.sort(comparator(lessOrEqual));
// arr
// null == null null == undefined undefined == undefined
// null和undefined除了和自身 ==， 还互相 ==， 此外和其他值都不会想等(==)
function existy(x) {
  return x != null;
}

existy(0);
existy(null);
existy(undefined);
existy(false);
// 除了false、null、undefined都认为是true
function truthy(x) {
  return x !== false && existy(x);
}

function doWhen(cond, action) {
  if (cond) {
    return action();
  }

  return undefined;
}

// 数量、歌词
const lyrics = [];
for (var bottles = 99; bottles > 0; bottles--) {
  if (bottles > 1) {
    lyrics.push(`${bottles - 1} bottles of beer on the wall`);
  } else {
    lyrics.push("No more bottles of beer on the wall!");
  }
}
// lyrics
function lyricsSegment(n) {
  const str =
    n > 1
      ? `${n - 1} bottles of beer on the wall`
      : "No more bottles of beer on the wall!";
  return [str];
}

function song(start, end, lyricsGen) {
  return _.range(start, end).reduce((ret, n) => ret.concat(lyricsGen(n)), []);
}

// song(99, 0, lyricsSegment)
var bFunc = function () {
  return this;
};
var b = { name: "b", fun: bFunc };
// b.fun

function allOf(...fns) {
  return _.reduce(fns, (truth, fn) => truth && fn(), true);
}
function anyOf(...fns) {
  return _.reduce(fns, (truth, fn) => truth || fn(), false);
}
function t() {
  return true;
}
function f() {
  return false;
}

allOf(t, t, t, f);
allOf(t, t, t);
allOf();
anyOf();
anyOf(t, t);
anyOf(t, f);
anyOf(f, f);

const library = [
  { title: "SICP", isbn: "0262010771", ed: 1 },
  { title: "SICP", isbn: "0262510871", ed: 2 },
  { title: "Joy of Clojure", isbn: "1935182641", ed: 1 },
];

_.findWhere(library, { title: "SICP" });
// console.log("🚀 ~ _.findWhere(library, { title: 'SICP' }):", _.where(library, { ed: 1 }))
_.pluck(library, "ed");
// console.log("🚀 ~ _.pluck(library, 'ed'):", _.pluck(library, 'title'))

function project(table, keys) {
  return _.map(table, (v) => _.pick(v, keys));
}

project(library, ["ed"]);
// console.log("🚀 ~ project(library, ['ed']):", project(library, ['ed']))
project(library, ["ed", "title"]);
// console.log("🚀 ~ project(library, ['ed', 'title']):", project(library, ['ed', 'title']))

// 从library查找title，并重命名为 label

// 替换一个
// 先把需要替换的key从对象中去掉作为初始值
// 将新的key和原来的值组合在一起
function rename(obj, newNames) {
  // obj
  // console.log("🚀 ~ rename ~ obj:", obj)
  return _.reduce(
    newNames,
    (o, newKey, oldKey) => {
      o[newKey] = obj[oldKey];

      return o;
    },
    _.omit(obj, _.keys(newNames))
  );
}

function as(table, newNames) {
  return _.map(table, (collectionItem) => rename(collectionItem, newNames));
}

// project(library, ['title'])
// console.log("🚀 ~ project(library, ['title']):", project(library, ['title']))
// rename(project(library, ['title']), [ ['title', 'label' ] ])
// console.log("🚀 ~ rename(project(library, ['title']), [ ['title', 'label' ] ]):", rename(project(library, ['title']), [ ['title', 'label' ] ]))

// as(project(library, { title: 'label' }))
// console.log("🚀 ~ as(project(library, { title: 'label' })):", as(project(library, { title: 'label' })))
rename(project(library)[0], { title: "label" });
// console.log("🚀 ~ rename(project(library)[0], { title: 'label'}):", as(project(library, ['title']), { title: 'title2'}))

// rename({ title: 1 }, {title: 'label'})
// console.log("🚀 ~ rename({ title: 1 }, {title: 'label'}):", rename({ title: 1 }, {title: 'label'}))

var globals = [];
// 接受一个函数，
function makeBindFun(resolver) {
  // 返回一个函数，接受 k v
  return function (k, v) {
    var stack = globals[k] || [];
    globals[k] = resolver(stack, v);
    return globals;
  };
}

var stackBinder = makeBindFun(function (stack, v) {
  stack.push(v);
  return stack;
});

var dynamicLookup = function (k) {
  var slot = globals[k] || [];
  return _.last(slot);
};

stackBinder("a", 1);
stackBinder("b", 100);
dynamicLookup("a");
// console.log("🚀 ~ a:", a)

function pluck(k) {
  return function (collection) {
    return collection && collection[k];
  };
}

// const obj = {
//   name: 'jg',
//   title: 'wsjg'
// }
// const arr = [1,2,3,4]
// const first = pluck(0)
// const getTitle = pluck('title')

// first(arr)
// console.log("🚀 ~ first(arr):", first(arr))

// getTitle(obj)
// console.log("🚀 ~ getTitle(obj):", getTitle(obj))

// function repeat(times, value) {
//   return _.map(_.range(times), ()=> value)
// }

// repeat(10, 'jg')
// console.log("🚀 ~ repeat(10, 'jg'):", repeat(10, 'jg'))

// function repeat(times, fn) {
//   return _.map(_.range(times), fn);
// }

// repeat(10, (i)=> i * 2)
// console.log("🚀 ~ repeat(10, (i)=> i * 2):", repeat(10, (i)=> i * 2))

// function repeat(fun, check, init) {
//   const ret = []
//   let result = fun(init)

//   while(check(result)) {
//     ret.push(result)
//     result = fun(result)
//   }
//   return ret
// }

// 生成1-10
// repeat((x)=> x, (x)=> x <= 10, 1)
// console.log("🚀 ~ repeat((x)=> x, (x)=> x <= 10, 1):", repeat((x)=> x + 1, (x)=> x <= 9, -1))

function always(value) {
  return function () {
    return value;
  };
}

var g = always(function () {});

// g() === g()
// console.log("🚀 ~ g() === g():", g() === g())

function makeUniqueString(start) {
  return function (prefix) {
    return [prefix, start++].join("");
  };
}

// makeUniqueString('wsjg')
const uniqueString = makeUniqueString(0);

// uniqueString('wsjg')
// console.log("🚀 ~ uniqueString('wsjg'):", uniqueString('wsjg'))
// uniqueString('wsjg')
// console.log("🚀 ~ uniqueString('wsjg'):", uniqueString('wsjg'))

var nums = [1, 2, 3, null, 5];

_.reduce(nums, (prev, cure) => prev * cure);
// console.log("🚀 ~ _.reduce(nums, (prev, cure)=> prev * cure):", _.reduce(nums, (prev, cure)=> prev * cure))

function fnull(fun, ...defaults) {
  return function (...args) {
    const safeArgs = _.map(args, (item, i) =>
      existy(item) ? item : defaults[i]
    );
    return fun.apply(null, safeArgs);
  };
}

_.reduce(nums,fnull((x, y) => x * y, 1, 1));
console.log("🚀 ~ _.reduce(nums,fnull((x, y) => x * y, 1, 1));:", _.reduce(nums,fnull((x, y) => x * y, 1, 1)))



const obj = {
  message: 'Hi!',
  type: 'display',
  from:"baidu.com"
}

function checker(...validators) {
  return function(obj) {
    return _.reduce(validators, (errs, check)=> {
      if(check(obj)) return errs
      else return _.chain(errs).push(check.message).value()
    }, [])
  }
}

// var fn = always(true)
// fn.message = '出现了一个错误'
// checker(obj, [fn])
// console.log("🚀 ~ checker(obj, [fn]):", checker(obj, [fn]))

// 比如此时有多个表单
// 你应该创建一个专门用来验证不同表单的函数，所以可以利用闭包先把验证函数传入
// 验证不同表单时传入对应的表单即可

// 验证函数需要设置一个message属性，每次都去设置很麻烦
// 创建一个函数，接收验证函数和message
// 并返回一个函数，这个函数的message属性为传入的message
function validator(message, fn) {
  const f = (...args)=> {
    return fn.apply(null, args)
  }
  f.message = message

  return f
}

// var form1 = {}
// var form2 = {}

// const checkForm1 = checker(validateFn(always(true), '出现了一个错误') )
// checkForm1(form1)
// console.log("🚀 ~ checkForm1(form1):", checkForm1(form1))

// const checkForm2 = checker( validateFn(always(false), '出现了一个错误') )
// checkForm2(form2)
// console.log("🚀 ~ checkForm2(form2):", checkForm2(form2))

function curry2(fun) {
  return function(secondArg) {
    return function(firstArg) {
      return fun(firstArg, secondArg)
    }
  }
}

const greaterThan = curry2((lhs, rhs)=> lhs > rhs)
const lessThen = curry2((lhs, rhs)=> lhs < rhs)

const withinRange = checker(
  validator('arg must be greater than 10', greaterThan(10)), 
  validator('arg must be less than 20',lessThen(20))
  )

withinRange(10)
// console.log("🚀 ~ withinRange(10):", withinRange(19))

// _.zip([ [1, 2,3], [2,4,6]  ])
// console.log("🚀 ~ _.zip([ [1, 2,3], [2,4,6]  ]):", _.zip( [1, 2,3], [2,4,6]  )) // [ [1,2], [2,4], [3,6] ]

function second(arr) {
  return nth(arr, 1)
}

function construct(value, arr) {
  return _.chain(_.toArray(arr)).unshift(value).value()
}

function constructPair(pair, rets) {
  return [
    construct(_.first(pair), _.first(rets)),
    construct(second(pair), second(rets)),
  ]
}

constructPair(['b', 2] ,constructPair(['a', 1], [[], []]))

function unzip(pairs) {
  if(_.isEmpty(pairs)) {
    return [[ ], [ ]]
  }

  return constructPair(_.head(pairs), unzip(_.rest(pairs)) )
}

unzip([ ['a', 1], ['b', 2], ['c', 3] ])
// console.log("🚀 ~ unzip([ ['a', 1], ['b', 2], ['c', 3] ]):", unzip([ ['a', 1], ['b', 2], ['c', 3] ]))
// 126


// 递归
// 1.何时停止 
// 2.进行一个步骤(解决问题的方法)
// 3.小一些的问题(把问题变的更小)

var influences = [
  ['Lisp', 'Smalltalk'],
  ['Lisp', 'Scheme'],
  ['Smalltalk', 'Self'],
  ['Scheme', 'JavaScript'],
  ['Scheme', 'Lua'],
  ['Self', 'Lua'],
  ['Self', 'JavaScript'],
]

function nexts(graph, node, ret = []) {
  // 1.终止条件
  // graph为空时，返回空数组

  // 2.进行一个步骤
  // 每次取出数组的第一项
  // 用数组第一项的第一个值和node作比较
  // 3.把问题变小
  // 如果相等 把数组第二项加入到返回值
  // 否则 去掉数组的第一项后继续调用

  if(_.isEmpty(graph)) return ret

  const pair = _.first(graph)
  const [from, to] = pair
  const restGraph = _.rest(graph)

  if(_.isEqual(node, from)) {
    ret.push(to)
  }

  return nexts(restGraph, node, ret)
}

nexts(influences, 'Lisp')
console.log("🚀 ~ nexts(influences, 'Lisp'):", nexts(influences, 'Scheme'))

// 广度优先
// 终止条件是，该节点没有关联节点的时候停止

// 默认从graph的第一项开始查找


// 深度优先
// nodes为空是终止条件, 
// 从nodes中拿出第一项
// 判断seen中是否有该项
// 3.更小一些的问题
// 如果有 递归调用depthSearch,nodes变为去掉数组第一项，其他参数不变
// 否则 graph不变，nodes需要根据当前nodes中的第一项得到与它有关的项目(nexts(node)), seen将当前node添加到数组
function depthSearch(graph, nodes, seen) {
  if(_.isEmpty(nodes)) return seen

  const node = _.first(nodes)
  const more = _.rest(nodes)

  if(_.contains(seen, node)) {
    return depthSearch(graph, more, seen)
  }

  return depthSearch(
    graph,
    nexts(graph, node).concat(more),
    _.chain(seen).push(node).value(),
  )
}

depthSearch(influences, ['Lisp'], [])
console.log("🚀 ~ depthSearch(influences, ['Lisp'], []):", depthSearch(influences, ['Lisp'], []))



