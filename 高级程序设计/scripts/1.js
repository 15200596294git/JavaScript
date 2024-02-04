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
// console.log(String(undefined))

/**
 * ++,--可以应用所有值，规则如下
 * 1.应用于有效数字字符串，转为数字再执行操作
 * 2.应有于无效数字字符串,转为NaN再进行操作(不过NaN的+或者-都会返回NaN)
 * 3.应用于false时，转换为0再执行操作
 * 4.应用于true时，转换为1再执行操作
 * 5.应用于浮点数时，由于是number类型，直接执行操作
 * 6.应用于对象，先valueOf再toString,如果是基本类型就走上面的操作，如果都不是基本类型就会报错
 */
// var a = '1'
// var b = '1a'
// var c = 'a1'
// var d = false
// var e = true
// var f = {}
// console.log(++a);
// console.log(++b);
// console.log(++c);
// console.log(++d);
// console.log(++e);

// console.log(++f);

/**
 * Number() ++,--,+,-
 */

/**
 * 按位非 ~ 操作数的负值减1
 * 按位与 & 二进制位数上两个操作数都为1就返回1，否则返回0
 * 按位或 | 二进制位数上两个操作数其中一个为1就返回1，否则返回0
 * 按位异或 二进制位数上，如果两个操作数一样就返回0，否则返回1
 */

// console.log(~5); // -6
// console.log(~0); // -1
// console.log(~NaN); // -1
// console.log(~Infinity); // -1

// console.log(1 & 2) // 1 10 -> 0
// console.log(1 | 2); // 1 10 -> 11 -> 3
// console.log(1 ^ 2); // 1 10 -> 11 -> 3


/**
 * 布尔操作符
 * 逻辑非 !
 * 1.!! 和 Boolean()作用相同
 * 逻辑与 &&
 * 1.逻辑与属于短路操作，如果第一个操作数能够决定结果，那就不会对第二个操作数求值
 *   (逻辑与是如果两个值为true，返回true，否则返回false。如果第一个操作数是上述6个假值中的某一个，那么就返回这个操作数(因为它已经决定了结果)，否则就返回第二个操作数)
 * 逻辑或 ||
 * 1.逻辑或属于短路操作，如果
 * （其中一个为true就返回true，否则返回false，如果第一个值不是上述6个假值中的某一个(是一个真值)，那就直接返回该结果，否则是上述假值中的一个，那就返回第二个操作数）
 * null undefined NaN 0 '' false JavaScript中的6个假值
 */

/**
 * 乘法 *
 * 1.如果一个操作数是NaN，结果是NaN
 * 2.如果Infinity与0相乘，则结果是NaN
 * 3.如果Infinity与非0数值相乘，结果是Infinity或者-Infinity
 * 4.如果Infinity与Infinity相乘，结果是Infinity
 * 5.如果操作数不是数值，调用Number()之后再执行以上操作
 * 
 * 除法 /
 * 1.如果一个操作数是NaN,结果是NaN
 * 2.如果Infinity被Infinity除，结果是NaN
 * 3.0/0, 结果是NaN
 * 4.非0有限数 / 0，结果是Infinity或-Infinity
 * 5.非0数值/Infinity,结果是Infinity或-Infinity
 */

/**
 * 例举JavaScript中的几个特殊值
 * null null
 * undefined undefined
 * number NaN Infinity -Infinity
 * NaN: 计算的时候无法计算成一个数值，就用NaN表示
 * Infinity: 这个值超出了JavaScript所能表示的数值的范围
 */



/**
 * String()
 *  1.如果是Object类型，就直接调用Object的toString()函数
 *  2.如果是基本类型
 *   2.1null 返回 'null'
 *   2.2undefined 返回 'undefined'
 *   2.3其余的基本类型,也都是直接调用toString()函数
 * Number()
 * 
 */

/**
 * String() 猜想验证
 */
var object = {}, array = [], fun = ()=> {}, date = new Date(), regExp = new RegExp(), math = Math, error = new Error()
var big = BigInt(1)
var sym  = Symbol()
// 以下全都返回true 
console.log(
  String(object) === object.toString() , '\n',
  String(array) === array.toString() , '\n',
  String(fun) === fun.toString() , '\n',
  String(date) === date.toString() , '\n',
  String(math) === math.toString() , '\n',
  String(error) === error.toString() , '\n',
  // 基本类型
  String(null) === 'null', '\n',
  String(undefined) === 'undefined', '\n',
  String(true) === true.toString(), '\n',
  String(false) === false.toString(), '\n',
  String(NaN) === NaN.toString(), '\n',
  String(Infinity) === Infinity.toString(), '\n',
  String(-Infinity) === -Infinity.toString(), '\n',
  String(0) === 'null', (0).toString(),
  String(big) === big.toString(), '\n',
  String(sym) === sym.toString(), '\n',


  // String('1') === 'null', '\n',
)


/**
 * ECMAScript 标准定义了8中数据类型
 * Boolean
 * null
 * undefined
 * Number
 * Bigint
 * String
 * Symbol
 * Object
 *  Array
 *  Function
 *  Date
 *  RegExp
 *  Maht
 *  Error
 */

/**
 * + - * / 中，如果其中一个操作数为NaN，那么结果就会是NaN
 * 
 * +
 * a.如果其中一个为字符串，那么会用toString()将另外一个值也转为字符串，并且将它们连接起来
 * b.如果双方都是BigInt,则执行BigInt加法。如果一方是BigInt而另一方不是，会抛出 TypeError.
 * c.否则，双方都会被转换为数字，执行数字加法 
 * 1. 1 + null
 * 2. 1 + undefined
 * 3. 1 + NaN
 * 4. 1 + Infinity
 * 5. 1 + -Infinity
 * 
 * -
 * * 1. - + null
 * 2. 1 - undefined
 * 3. 1 - NaN
 * 4. 1 - Infinity
 * 5. 1 - -Infinity
 * 
 * *
 * 1. 1 * null
 * 2. 1 * undefined
 * 3. 1 * NaN
 * 4. 1 * Infinity
 * 5. 1 * -Infinity
 * 
 * /
 * 1. 1 / null
 * 2. 1 / undefined
 * 3. 1 / NaN
 * 4. 1 / Infinity
 * 5. 1 / -Infinity
 */



