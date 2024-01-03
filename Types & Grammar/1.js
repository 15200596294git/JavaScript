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
// var a = 'foo'
// var ret = Array.prototype.join.call(a, '.')
// console.log(ret);
// console.log(Array.prototype.map.call(a, (cha)=> cha.toUpperCase() + '.' ));

// console.log(Array.prototype.reverse.call(a));

// Number.EPSION 表示1与大于1的最小浮点数之间的差值
// 我理解的就是精度，我们把JS的数字范围比作一个刻度，0开始，第一个大于0的刻度为0.1
// 那也就是说它的精度只能到0.1，那么0.1在JS中能够精确表示，但是0.01JS就不能精确表示
// 比如我们有两个数，0.05 0.06,正常他们相加要等于0.11,但是由于精度只能到0.1,所以就可能导致0.05+0.06不等于0.11
// 此时我们不能用===去判断两个数是否相等
// 应该把0.5+06的和减去0.11,然后取绝对值，如果他们之间的差值在JS中最小差值只能，那就认为这两个数相等
// 如果超过了，那就不相等

// 返回false，但是正常应该返回true
// 有时间再研究研究
isNumberEqual(1000.1 + 2000.2 , 2000.3)  

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


/* var isReady = false
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
} */

/**
 * --------------------------------------------- 类型
 */

/* var a = 1 / 0 // Infinity
var b = -1 / 0 // -Infinity

// 无穷除以无穷 为未定义操作，所以结果为NaN
Infinity / Infinity // NaN
Infinity / -Infinity // NaN

// 首先因为 1 / 0 = Infinity 1 / Infinity = 0
// 当 1 / 0时，相当于要找一个数 * 0 来等于1 ，但是我们都知道任何数*0都为0
// 所以我们假设程序从 1开始找，直到超出JavaScript都没有找到这个结果，此时就用一个Infinity代替
// 1 * 0 !== 1, 继续找 2 * 0,3 * 0......
1 / Infinity // 0

-1 / 0 // -Infinity
-1 / -Infinity // 0
-1 / Infinity // -0

var a = -0
a.toString() // 0
console.log("🚀 ~ file: 1.js:79 ~ a.toString():", a.toString())
JSON.stringify(a) // 0
console.log("🚀 ~ file: 1.js:81 ~ JSON.stringify(a):", JSON.stringify(a))

var b = '-0'
JSON.parse(b) // -0
console.log("🚀 ~ file: 1.js:85 ~ JSON.parse(b):", JSON.parse(b))
b.toString() // -0
console.log("🚀 ~ file: 1.js:87 ~ b.toString():", b.toString())

0 == -0 // true
0 === -0 // true

// 是否为-0
// 因为 0 === -0
function isNegZero(value) {
    return value === 0 && (1 / value === -Infinity)
}

// Object.is 可以处理
// 0 === -0 , NaN !== NaN 的情况
Object.is(NaN, NaN)
console.log("🚀 ~ file: 1.js:101 ~ Object.is(NaN, NaN):", Object.is(NaN, NaN))
Object.is(NaN, 0)
console.log("🚀 ~ file: 1.js:103 ~ Object.is(NaN, 0):", Object.is(NaN, 0))
Object.is(0, -0)
console.log("🚀 ~ file: 1.js:105 ~ Object.is(0, -0):", Object.is(0, -0))
Object.is(0, 0)
console.log("🚀 ~ file: 1.js:107 ~ Object.is(0, 0):", Object.is(0, 0))

if(!Object.is) {
    // Object.is是判断两个数是否相等
    // 但是也就除了NaN === NaN(false) 和 0 === -0(true)不符合我们的预期
    // 其他情况都符合我们的预期，所以我们只需要分别处理这两种情况即可
    // 其他情况我们还是用 === 比较
    Object.is = function(v1, v2) {
        // 0和-0
        if(v1 === 0 && v2 === 0) {
            // v1为0 v2为-0
            // 或者 v1为-0 v2为0
            // if( (!isNegZero(v1) && isNegZero(v2)) || (isNegZero(v1) && !isNegZero(v2)) ) {
            //     return false
            // }
            //  1 / 0 返回Infinity 1 / -0 返回Infinity
            // Infinity === Infinity -Infinity === -Infinity
            // 0 和 -0会直接相等
            // 但是0可以转为Infinity,-0可以转为-Infinity
            // Infinity 使用===比较时，符号相等才会相等，这样就可以避免0和-0出现的问题了
            return 1 / v1 === 1 / v2
        }

        // 如果其中一个值为NaN
        // 那么如果另外一个值也会NaN那就返回true，否则返回false
        if(v1 !== v1) {
            return v2 !== v2
        }
        // 其他情况
        return v1 === v2
    }
}


Infinity + Infinity // Infinity
Infinity - Infinity // NaN
Infinity * Infinity // Infinity
Infinity / Infinity // NaN

function foo(x) {
  x.push(4)
  // x 1,2,3,4

  // a和x本来是指向[1,2,3,4]值的引用
  // 现在把x的引用更改到另一个值上，那么a还是原来的值
  x = [4,5,6]
  // 此时再更改x，不会影响到原来的a
  x.push(7)
  // x 4,5,6,7
}

var a = [1,2,3]
foo(a)

var a = {}
var mysym = Symbol('s')
a[mysym] = a
Object.getOwnPropertySymbols(a) */



/**
 * --------------------------------------------- 强制类型转换
 */
var a = 42
var b = a + '' // 隐式强制类型转换
var c = String(a) // 显示强制类型转换



/**
 * --------------------------------------------- 类型
 */


/**
 * --------------------------------------------- 类型
 */