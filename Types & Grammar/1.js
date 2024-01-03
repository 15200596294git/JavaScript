/**
 * --------------------------------------------- 类型
 */
// JavaScript有7中内置类型
// 空值 null
// 未定义 undefined
// 布尔值 boolean
// 数字 number
// 字符串 string
// 对象 object
// 符号 symbol

/* typeof undefined === 'undefined' // true
typeof true === 'boolean' // true
typeof 42 === 'number' // true
typeof '42' === 'string' // true
typeof { life: 24} === 'object' // true

typeof null === 'object' // true

var val = null
typeof val === 'object' && val !== null


// 比如有DEBUG变量，但是DEBUG只有在开发环境时才被加载，在生产环境时不加载
// 也就是说在生产环境该变量为undeclared,那么在访问时便会报错，
// DEBUG is not defined
// 此时typeof提供了一个安全机制，就是当变量没有声明时(var)，typeof该变量不会报错，而是返回undefined

// 如果是开发环境
if(typeof DEBUG !== undefined) {
    console.log('开发环境');
} else {
    console.log('生产环境');
}

// 或者通过window访问
if(window.DEBUG) {
    console.log('开发环境');
} else {
    console.log('生产环境');
}
 */

/**
 * --------------------------------------------- 值
 */
/* var a = 'foo'
var ret = Array.prototype.join.call(a, '.')
console.log(ret);
console.log(Array.prototype.map.call(a, (cha)=> cha.toUpperCase() + '.' )); */

// console.log(Array.prototype.reverse.call(a)); // 改变数组的数组方法不能调用

// Number.EPSION 表示1与大于1的最小浮点数之间的差值
// 我理解的就是精度，我们把JS的数字范围比作一个刻度，0开始，第一个大于0的刻度为0.1
// 那也就是说它的精度只能到0.1，那么0.1在JS中能够精确表示，但是0.01JS就不能精确表示
// 比如我们有两个数，0.05 0.06,正常他们相加要等于0.11,但是由于精度只能到0.1,所以就可能导致0.05+0.06不等于0.11
// 此时我们不能用===去判断两个数是否相等
// 应该把0.5+06的和减去0.11,然后取绝对值，如果他们之间的差值在JS中最小差值只能，那就认为这两个数相等
// 如果超过了，那就不相等

/* function isNumberEqual(num1, num2) {
  return Math.abs(num1 - num2) < Number.EPSILON
}

function isGraterThan(num1, num2) {
  return num1 - num2 > Number.EPSILON
}
function isLessThan(num1, num2) {
  return num2 - num1 > Number.EPSILON
}

// Number.isInteger 原理
if(!Number.isInteger) {
  Number.isInteger = function(value) {
    return typeof value === 'number' && value % 1=== 0
  }
}

// Number.isSafeInteger
if(!Number.isSafeInteger) {
  Number.isSafeInteger = function(value) {
    // Math.abs 比如最大整数值为10，那么负数也就只能-10，所以此时要使用Math.abs
    return Number.isInteger(value) && Math.abs(value) <= Number.MAX_SAFE_INTEGER
  }
} */


var isReady = false
function dosomething() {
  if(!isReady) {
    setTimeout(dosomething, 500);
    return
  }

  return true
}

setTimeout(() => {
  isReady = true
}, 2000);

// isNaN
// 按道理应该是判断一个值是否为NaN
isNaN(NaN) // true 符合预期
isNaN('foo') // true 不符合预期

// Number也有一个静态方法, Number.isNaN
Number.isNaN(NaN)
Number.isNaN('foo')

// polyfill
if(Number.isNaN) {
  Number.isNaN = function(value) {
    return typeof value === 'number' && isNaN(value)
  }
}

// NaN 是JS中唯一一个不等于自身的值
function isNaN(value) {
  return value !== value
}

/**
 * --------------------------------------------- 类型
 */


/**
 * --------------------------------------------- 类型
 */


/**
 * --------------------------------------------- 类型
 */


/**
 * --------------------------------------------- 类型
 */