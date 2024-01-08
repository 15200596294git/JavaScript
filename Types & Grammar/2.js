// 语法

// 声明语句
// var a = 3 * 6
// 赋值表达式
// a = 3 * 6
// 表达式语句
// a

/* var a = 42
var b = a++
// a 42
// b 43

// 使用逗号运算符，返回a++之后的值
var a = 42
var b = (a++,a) // 要加括号
 */

// 使用标签
// continue后面跟标签名,意思为指向foo的下一轮循环
/* foo: for (var i = 0; i < 4; i++) {
  if (i % 2 === 0) {
    continue foo;
  }
  console.log(i);
}

var val = 1;
if (val === 1) {
    // domesomething
} else if (val === 2) {
    // domesomething
} else if (val === 3) {
    // domesomething
}

// 实际JavaScript中没有 else if
// 实际只是else省略了后面的括号
if(val === 1) {
    // dosomething
} else {
    if(val === 2) {
        // dosomething
    } else {
        if(val === 3) {
            // dosomething
        }
    }
}

// , 用来连接一系列语句的时候，它的优先级最低
var a = 42
var b = a++, a // 相当于(var b = a ++), a
// a为43，b为42

// &&运算符的优先级高于 = 
var a = true, b
// 当a为真值时，为b赋值为1
a && (b = 1)
// 去掉括号
// a && b = 1 会有语法错误

// &&运算符的优先级高于||, ||运算符的优先级高于 ? :

var a = 42
var b = 'foo'
var c = false
var d = a && b || c ? c || b ? a : c && b : a

((a && b) || c) ? (c || b) ? a : (c && b) : a

// 左关联和右关联
// 大多数时左关联
// ? : 是右关联
a ? b : c ? d : e // a ? b : (c ? d : e)
// = 赋值是右关联
var a, b, c
a = b = c = 42 // -> a = (b = (c = 42))
a = (b = (c = 42))

((a && b) || c) ? ((c || b) ? a : (c && b)) : a;

// 暂时性死区

{
    typeof b // 对未声明的变量b使用typeof不会报错
    typeof a // 对let声明的变量啊使用typeof会报错
    let a 
}

// a = a + b,在b的暂时性死区访问b，会报错
function foo(a, b = a + b) {} */

// function foo() {
//   try {
//     return 42;
//   } finally {
//     console.log("Hello");
//   }
//   console.log("never runs");
// }
// foo()

// function foo() {
//   try {
//     throw 42;
//   } finally {
//     console.log("Hello");
//   }
//   console.log("never runs");
// }
// console.log(foo()); // 先答应Hello，在抛出 错误

// function foo() {
//   try {
//     return 42;
//   } finally {
//     throw "Oops!";
//   }
//   console.log("never runs");
// }

// console.log(foo()); // finally中抛出异常，return 42会被丢弃(结果就是报错)

// finally中的return会覆盖try和catch中的return返回值
// function foo() {
//     try {
//         return 42
//     }finally {
//         return 1
//     }
// }

// console.log(foo()); // 1

// switch case
var a = null
// 当switch case需要强制类型转换时
switch(true) {
    case a == 42:
        console.log('a为字符串');
        break
    case a == null:
        console.log('a为null或者undefined')
}