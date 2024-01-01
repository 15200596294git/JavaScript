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
var a = 'foo'
var ret = Array.prototype.join.call(a, '.')
console.log(ret);
console.log(Array.prototype.map.call(a, (cha)=> cha.toUpperCase() + '.' ));

console.log(Array.prototype.reverse.call(a));


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