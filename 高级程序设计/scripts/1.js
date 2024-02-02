// 访问一个未声明的变量会报错
// 比如
// console.log(a) // a没有声明，会报错
// 但是可以用typeof操作符
// console.log(typeof a) //  不会报错，并且返回了undefined

// isNaN和Number.isNaN
// isNaN会调用valueOf，如果不是基本类型，那么会再调用toString; 但是Number.isNaN不会
// console.log(isNaN({})) // true obj.valueOf()还是返回一个{},不是基本类型，然后调用toString,返回字符串，尝试将字符串 '[object Object]'转为数字时，就会变成NaN，从而返回了true
// console.log(Number.isNaN({})) // false 不会进行转换，是NaN就是NaN，不是就不是

// Number parseInt parseFloat都可以将非数字值转为数字
// 其中Number可以用作任何数据类型，另外两个专门用于把字符串转成数值

/**
 * Number()函数转换规则, 一元+操作符和Number()函数相同
 * 1.如果是Boolean值，true和false将分别转换为1和0
 * 2.如果是数字，只是简单的传入和返回
 * 3.如果是null，返回0
 * 4.如果是undefined,返回NaN
 * 5.如果是字符串
 *  5.1如果字符串只包含数字(包括正负号)，则将其转换为十进制数值，注意 '011'转换为11(前导的0被忽略了)
 *  5.2如果字符串包含有效的浮点，则将其转换为相应的浮点值(忽略前导0)
 *  5.3如果字符串中包含有效的十六进制格式，例如 ‘0xf’,将其转换为相同大小的十进制整数值
 *  5.4如果字符串是空的(不包含任何字符串)，则将其转换为0
 *  5.5如果字符串包含除上述格式之外的字符，则将其转换为NaN
 * 6.如果是对象，调用对象的valueOf,如果valueOf返回的是基本类型，那就走上面的判断，如果不是基本类型就再调用toString，如果toString返回基本类型就走上面的操作，如果不是基本类型那就会报错
 */

// console.log(Number(true)); // 1
// console.log(Number(false)); // 0

// console.log(Number(1)); // 还是数字 1
// console.log(Number(0)); // 还是数字 0

// console.log(Number(null)); // 0

// console.log(Number(undefined)); // NaN

// console.log(Number('011')); // 11
// console.log(Number('0000000011')); // 11

// console.log(Number('000.001')); // 0.001
// console.log(Number('0.1.1')); // NaN 因为这不是有效的浮点，所以是NaN

// console.log(Number('0xf')); // 15
// console.log(Number('0x1')); // 1

// console.log(Number('')); // 0
// console.log(Number('   ')); // 0
// console.log(Number('5452.,')); // NaN

// var obj = {
//   valueOf() {
//     return {}
//   },
//   toString() {
//     return 1
//   }
// }
// console.log(Number(obj)); // 1 先调用valueOf返回了{}，不是一个基本类型，然后调用toString,返回数字1，是一个基本类型

/**
 * parseInt(),parseInt可以传入第二个参数指定基数，parseInt('1', 10)
 * 会将第一个参数转换为一个字符串，并忽略前后空格，对该字符串进行解析
 * 1.从字符串开头开始解析(去掉了前后多余空格后)
 *  1.1如果为空字符串，返回NaN
 *  1.2如果第一个字符串为非数字，返回NaN()
 *  1.3如果遇到小数点或者非数字，停止解析
 */

// console.log(parseInt('')); // NaN
// console.log(parseInt('  ')); //NaN

// console.log(parseInt('1.2')); // 1
// console.log(parseInt('a1.2')); // NaN
// console.log(parseInt('1.2.2')); // 1
// console.log(parseInt('0.12')); // 0
// console.log(parseInt('1.a')); // 1

/**
 * parseFloat 和parseInt类似,只不过多解析一个小数点
 */

// console.log(parseFloat('.1')); // 0.1

/**
 * String()
 * 1.如果值有toString()方法，则调用该方法，如果得到的是一个基本类型，那么就将基本类型变成字符串，如果不是基本类型就会报错
 * 2.如果值是null,返回'null'
 * 3.如果值是undefined,返回'undefined'
 */

// var obj = {
//   toString() {
//     return true
//   }
// }
console.log(String(undefined))