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


/**
 * --------------------------------------------- 类型
 */

var a = 1 / 0 // Infinity
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

/**
 * --------------------------------------------- 类型
 */


/**
 * --------------------------------------------- 类型
 */


/**
 * --------------------------------------------- 类型
 */