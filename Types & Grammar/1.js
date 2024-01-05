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
// isNumberEqual(1000.1 + 2000.2 , 2000.3)  

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

// ToString
// null // 'null'
// undefined // 'undefined'
// true // 'true'

var a = 42
var b = a + '' // 隐式强制类型转换
var c = String(a) // 显示强制类型转换


// JavaScript中的强制类型转换总是返回标量基本类型
// 如 字符串、数字和布尔值，不会返回对象和函数

// JSON.stringify不能处理  undefined function symbol和包含循环引用的对象
JSON.stringify(undefined) // undefined
JSON.stringify(function() {}) // undefined
JSON.stringify(Symbol('a')) // undefined

var obj = {

}
var obj2 = {
    a: obj
}
obj.a = obj2 // 形成了循环引用
// JSON.stringify(obj) // 报错
// JSON.stringify(obj2) // 报错

// 对象中遇到undefined Symbol function会忽略该属性值
// 在数组中遇到undefined Symbol function 该值会变成null
var obj3 = {
    a: undefined,
    b: Symbol(),
    c: function() {},
    d: [undefined, Symbol(), function() {}]
}
// console.log(JSON.stringify(obj3));

var obj4 = {
    a: undefined,
    b: Symbol(),
    // 对象定义toJSON函数，那么在JSON.stringify时会先调用toJSON
    // 然后对toJSON返回的值，再进行JSON.stringify,相当于先进行一次处理
    toJSON() {
        return {a: 2}
    }
}
// console.log(JSON.stringify(obj4));

// JSON.stringify第二个参数
var obj5 = {
    a: 1,
    b: 2,
    c: 3,
    d: {
        e: 1
    }
}
var arr1 = [1,2,3,4]
// 获取指定的一个或者多个key
// console.log(JSON.stringify(obj5, ['a'])); // 只返回由键a的值组成的对象
// console.log(JSON.stringify(arr1, ['0']));

// 传入一个函数
console.log(JSON.stringify(obj5, function(k,v) {
    // console.log(k === 'a');
    // console.log(k,v);
    console.log(k);
    // console.log(v);
    // if(k === undefined) {
    //     return v
    // }
    if(k === 'a') {
        return 
    }
    return v
}))

// toBoolean
// 布尔强制类型转换为假值 undefined null false (+0 -0 NaN) ''
// 假值对象
console.log(!!new Boolean(false))
console.log(!!new Number(0))
console.log(!!new String(''))

var a = 42
~a // -43
-(a+1) // -43

var str = 'Hello World'
// ~-1时才为0，其他都不为0
// 配合indexOf。indexOf在没找到值时返回-1,否则返回下标
// 判断字符串中是否存在子字符串，lo
// 如果找到子字符串 lo
if(~str.indexOf('lo')) {
  console.log('字符串中含有子字符串 lo')
}

// 如果没有找到子字符串 lo
if(!~str.indexOf('lo')) {
  // ~表示对数字+1然后加一个-号
  // -(x+1), 只有当x为-1时,～才会返回0，和indexOf没找到值时返回-1正好契合
  // 那也就是说找到值会为true，没找到值为false
  // 此时需要在没找到值时做一些操作，那就再加一个取反操作
  console.log('字符串中不包含子字符串时')
}

parseInt('I', 19) // 18
parseInt('a', 10) // NaN
parseInt('a', 11) // 10
// parseInt第二个参数为基数
// 第二个例子传入了一个a，但是基数为10，只能0-9
// 第二个例子传入了一个a，基数为11，可以识别0-9 + a,
// 所以第一个例子也是一个道理，18为基数，包含了I，所以I就转换成了数字

// 字符串和数字之间的隐式强制类型转换
// 1.字符串和数字相加 1 + '1'
// 使用 + 时，如果其中一个操作数为字符串(或者通过toPrimitive抽象操作能够得到字符串)，那么就进行字符串拼接，否则执行数字加法
// 个人理解：因为 + 有两种操作，两数相加或者字符串拼接，所以就是先判断应该执行上述哪种操作，如果是字符串拼接，就要把操作数转为字符串
// 这就对应前面讲的ToString抽象操作了，反之如果是使用正常的两数相加，那么就应该对两个数只想ToNumber抽象操作，然后在对这两个值进行处理
console.log(1 + '1'); // 其中一个为字符串，把第一个操作数number 1转为字符串 '1',然后执行字符串拼接 '11'

// 首先对[]进行TOPrimitive抽象操作，[].valueOf() 返回[],不是一个基本类型，接下来调用toString，返回 '',是一个基本类型
// 这样当其中一个操作数为字符串时，就会用字符串拼接，接着number 1 就会通过ToPrimitive抽象操作，用于1是基本类型，在进行强制
// 类型转换时会通过new Number()对1进行封装，变成一个封装对象，然后调用封装对象的valueOf,结果返回number 1,此时1位基本类型
// 但是1不是字符串，再对1进行String(),返回字符串1，此时相当于 '' + '1' 结果为 '1'
console.log([] + 1); 

var obj = {
  toString() {
    // return []
    return 1
  }
}

// String() 会直接调用值的toString函数
// 如果toString返回的不是基本类型，那么就会报错
// 如果返回的是基本类型在对基本类型调用toString
console.log(String(obj));

// - * / 时会需要将两个操作数都转为number
// 此时就是内部抽象操作ToNumber，根据规则，也是通过内部抽象操作ToPrimitive依次调用valueOf和toString
// 如果有一个返回的是基本类型，再对基本类型进行Number()调用，如果两个都不返回基本类型，就会报错


// 有并且仅有一个参数为true，就返回true，否则返回false
function onlyOne(a,b,c) {
    return !!((a && !b && !c) || (!a && b && !c) || (!a && !b && c))
}
// 利用布尔类型转数字
function onlyOne2(...args) {
    let sum = 0
    args.forEach(arg=> {
        if(arg) {
            sum += (!!arg) - 0
        }
    })

    return sum === 1
}

onlyOne2(true, true, true, true)
onlyOne2(true)
onlyOne2(true, false)
onlyOne2(true, false, false)
onlyOne2([])
onlyOne2([], false)
onlyOne2([], false, {})


// 隐式强制类型转换为布尔值
// 1.if(...) 条件判断式
// 2.for(..;..;..) 语句中的条件判断式(第二个) 
// 3.while() do...while() 循环中的条件表达式
// 4.? : 中的条件表达式
// 5.逻辑运算符 || 和 && 左边的操作数

// && 和 || 返回值不一定时布尔类型，而是两个操作数其中一个的值
// && 如果第一个值为假值，那就返回第一个值，否则第一个值为真值，那就返回第二个值
// || 如果第一个值为真值，就返回第一个值，否则第一个值为假值，那就返回第二个值

// a || b -> a ? a : b
// a && b -> a ? b : a


var s = Symbol('symbol')
s.toString() // Symbol(symbol)
// s + '' // 报错
// Number(s) 报错
// s - 0 报错

// == 允许再相等比较中进行强制类型转换 而===不允许

/**
 * --------------------------------------------- 类型
 */


/**
 * --------------------------------------------- 类型
 */