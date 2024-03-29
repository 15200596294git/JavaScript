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
var bFunc = function() {return this}
var b=  { name: 'b', fun: bFunc}
// b.fun

function allOf(...fns) {
  return _.reduce(fns, (truth, fn)=> truth && fn(), true)
}
function anyOf(...fns) {
  return _.reduce(fns, (truth, fn)=> truth || fn(), false)
}
function t() { return true }
function f() { return false }

allOf(t,t,t,f)
allOf(t,t,t)
allOf()
anyOf()
anyOf(t, t)
anyOf(t,f)
anyOf(f,f)

const library = [
  { title: 'SICP', isbn: '0262010771', ed: 1},
  { title: 'SICP', isbn: '0262510871', ed: 2},
  { title: 'Joy of Clojure', isbn: '1935182641', ed: 1},
]

_.findWhere(library, { title: 'SICP' })
// console.log("🚀 ~ _.findWhere(library, { title: 'SICP' }):", _.where(library, { ed: 1 }))
_.pluck(library, 'ed')
// console.log("🚀 ~ _.pluck(library, 'ed'):", _.pluck(library, 'title'))

function project(table, keys) {
  return _.map(table, (v)=>  _.pick(v, keys))
}


project(library, ['ed'])
// console.log("🚀 ~ project(library, ['ed']):", project(library, ['ed']))
project(library, ['ed', 'title'])
// console.log("🚀 ~ project(library, ['ed', 'title']):", project(library, ['ed', 'title']))

// 从library查找title，并重命名为 label

// 替换一个
// 先把需要替换的key从对象中去掉作为初始值
// 将新的key和原来的值组合在一起
function rename(obj, newNames) {
  // obj
  // console.log("🚀 ~ rename ~ obj:", obj)
  return _.reduce(newNames, (o, newKey, oldKey)=> {
    o[newKey] = obj[oldKey]

    return o
  }, _.omit(obj, _.keys(newNames)) )
}

function as(table, newNames) {
  return _.map(table, (collectionItem)=> rename(collectionItem, newNames))
}

// project(library, ['title'])
// console.log("🚀 ~ project(library, ['title']):", project(library, ['title']))
// rename(project(library, ['title']), [ ['title', 'label' ] ])
// console.log("🚀 ~ rename(project(library, ['title']), [ ['title', 'label' ] ]):", rename(project(library, ['title']), [ ['title', 'label' ] ]))

// as(project(library, { title: 'label' }))
// console.log("🚀 ~ as(project(library, { title: 'label' })):", as(project(library, { title: 'label' })))
rename(project(library)[0], { title: 'label'})
// console.log("🚀 ~ rename(project(library)[0], { title: 'label'}):", as(project(library, ['title']), { title: 'title2'}))

// rename({ title: 1 }, {title: 'label'})
// console.log("🚀 ~ rename({ title: 1 }, {title: 'label'}):", rename({ title: 1 }, {title: 'label'}))

var globals = []
// 接受一个函数，
function makeBindFun(resolver) {
  // 返回一个函数，接受 k v
  return function(k, v) {
    var stack = globals[k] || []
    globals[k] = resolver(stack, v)
    return globals
  }
}

var stackBinder = makeBindFun(function(stack, v) {
  stack.push(v)
  return stack
})

var dynamicLookup = function(k) {
  var slot = globals[k] || []
  return _.last(slot)
}

stackBinder('a', 1)
stackBinder('b', 100)
dynamicLookup('a')
// console.log("🚀 ~ a:", a)

function pluck(k) {
  return function(collection) {
    return collection && collection[k]
  }
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


