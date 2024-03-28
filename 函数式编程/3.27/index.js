function splat(fun) {
  return function(array) {
    return fun.apply(null, array)
  }
}

function foo(a,b) {
  return a + b
}
var addArrayElements = splat(foo)

addArrayElements([1,2])
// console.log("🚀 ~ addArrayElements([1,2]):", addArrayElements([1,2]))

/**
 * 接收参数fun，参数类型为函数
 * 返回值为一个函数，这个函数将所有的参数收集为一个数组，返回并调用传入的fun，将收集的参数传入fun
 * @param {Function}
 * @returns {Function}
 */
function unsplat(fun) {
  return function(...args) {
    return fun.call(null, args)
  }
}
// 接收一个参数为数组，调用数组的join方法，并以' '分割
// 返回一个字符串
function foo2(array) {
  return array.join(' ')
}
var joinArrayElements = unsplat(foo2)
joinArrayElements(1,2)
// console.log("🚀 ~ joinArrayElements(1,2):", joinArrayElements(1,2))


function isString(value) {
  return typeof value === 'string'
}
// function isNaN(value) {
//   return isNaN(value)
// }
function parseAge(age) {
  if(!isString(age)) {
    throw new Error('Expecting a string')
  }

  console.log('尝试解析 age');
  const _age = parseInt(age)
  if(isNaN(_age)) {
    _age = 0
    console.log(['不能解析变量age', age].join(' '));
  }

  return _age
}
// parseAge(1)
// parseAge([])
parseAge('1')
