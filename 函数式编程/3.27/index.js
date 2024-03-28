function splat(fun) {
  return function (array) {
    return fun.apply(null, array)
  }
}

function foo(a, b) {
  return a + b
}
var addArrayElements = splat(foo)

addArrayElements([1, 2])
// console.log("🚀 ~ addArrayElements([1,2]):", addArrayElements([1,2]))

/**
 * 接收参数fun，参数类型为函数
 * 返回值为一个函数，这个函数将所有的参数收集为一个数组，返回并调用传入的fun，将收集的参数传入fun
 * @param {Function}
 * @returns {Function}
 */
function unsplat(fun) {
  return function (...args) {
    return fun.call(null, args)
  }
}
// 接收一个参数为数组，调用数组的join方法，并以' '分割
// 返回一个字符串
function foo2(array) {
  return array.join(' ')
}
var joinArrayElements = unsplat(foo2)
joinArrayElements(1, 2)
// console.log("🚀 ~ joinArrayElements(1,2):", joinArrayElements(1,2))


function isString(value) {
  return typeof value === 'string'
}

function isNumber(value) {
  return typeof value === 'number'
}

function isArray(value) {
  return Array.isArray(value)
}

function fail(thing) {
  throw new Error(thing)
}
function warn(thing) {
  console.log(['WARNING:', thing].join(' '));
}
function note(thing) {
  console.log(['NOTE:', thing].join(' '));
}

function parseAge(age) {
  if (!isString(age)) {
    fail(`Expecting a string, but ${JSON.stringify(age)}`)
  }

  note('尝试解析 age');
  let _age = parseInt(age)
  if (isNaN(_age)) {
    _age = 0
    warn(['不能解析变量age', age].join(' '));
  }

  return _age
}
// parseAge(1)
// parseAge([])
// parseAge('a1')
// parseAge('1')

function isIndexed(value) {
  return isString(value) || isArray(value)
}

/**
 * 接收一个数组和一个索引，返回对应的值
 * a必须是有索引的数据类型-Array或者String
 * index必须为Number类型
 * index必须 大于等于0 并且 <= a.length - 1
 */
function nth(a, index) {
  const aType = isIndexed(a) // 必须为字符串或者数组
  const isINumber = isNumber(index) // 索引必须为数字
  const isInnerOf = index >= 0 && index <= a.length - 1 // 索引在范围之内

  if (!aType) {
    fail(`Expect a String or an Array, but ${typeof a}, ${JSON.stringify(a)}`)
  }

  if (!isINumber) {
    fail(`Expect a Number, but ${typeof index}, ${JSON.stringify(index)}`)
  }

  if (!isInnerOf) {
    fail(`Out of bounds, ${JSON.stringify(index)}`)
  }

  return a[index]
}
var letters = ['a', 'b', 'c']
// nth(letters, 1)
// console.log("🚀 ~ nth(letters, 1):", nth({}, 2))

function first(a) {
  return nth(a, 0)
}

// first(letters)
// console.log("🚀 ~ letters:", first(letters))
// first('abc')
// console.log("🚀 ~ first('abc'):", first('abc'))


var arr = [2, 3, -1, -6, 0]

function lessOrEqual(x,y) {
  return x <= y
}
function comparator(prev) {
  return function(x,y) {
    if(prev(x,y)) {
      return -1
    }
    if(prev(y, x)) {
      return 1
    }

    return 0
  }
}
arr.sort(comparator(lessOrEqual))
// arr
// console.log("🚀 ~ arr:", arr)

// null == null null == undefined undefined == undefined
// null和undefined除了和自身 ==， 还互相 ==， 此外和其他值都不会想等(==)
function existy(x) {
  return x != null
}

existy(0)
// console.log("🚀 ~ existy(0):", existy(0))

existy(null)
// console.log("🚀 ~ existy(null):", existy(null))

existy(undefined)
// console.log("🚀 ~ existy(undefined):", existy(undefined))

existy(false)
// console.log("🚀 ~ existy(false):", existy(false))

// 除了false、null、undefined都认为是true
function truthy(x) {
  return (x !== false) && existy(x)
}

function doWhen(cond, action) {
  if(cond) {
    return action()
  }

  return undefined
}

// 数量、歌词
const lyrics = []
for(var bottles = 99; bottles > 0; bottles--) {
  if(bottles > 1) {
    lyrics.push(`${bottles - 1} bottles of beer on the wall`)
  } else {
    lyrics.push('No more bottles of beer on the wall!')
  }
}
// lyrics
// console.log("🚀 ~ lyrics:", lyrics)

function lyricsSegment(n) {
  const str = n > 1 ? `${bottles - 1} bottles of beer on the wall` : 'No more bottles of beer on the wall!'
  return ([])
    .push(str)
}

function range(start, end, fn) {
  Array.from({length: Math.abs(start - end)}, (_, i)=> fn(start ,i))
}
function song(start, end, lyricsGen) {
  Array.from({length: Math.abs(end - start)}, (_, i)=> {
    return lyricsGen(start)
  })
}

// song(99, 0, lyricsSegment)
console.log("🚀 ~ song(99, 0, lyricsSegment):", song(99, 0, lyricsSegment))


