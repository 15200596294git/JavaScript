/* function foo() {
    console.log(globalThis.a);
}

var a = 2
foo()*/

/* function foo() {
    console.log(this.a)
}

var obj2 = {
    a: 42, 
    foo: foo
}

var obj1 = {
    a: 2,
    obj2: obj2
}

obj1.obj2.foo() */

// 默认绑定
// 隐式绑定
// 显示绑定
// new绑定

// new > 显示 > 隐式 > 默认

/*function foo(a) {
    this.a = a
}

var obj1 = {}
var bar = new (foo.bind(obj1, 2))
console.log(obj1);
console.log(bar); */

/**---------------------------------- 对象 */
/* var arr = [1,2,3]
arr['7'] = 1 // 改变了数组的length属性
console.log(arr.length, arr); */

/* var obj1 = {}
Object.defineProperty(obj1, 'a', {
    value: 2,
    writable: true,
    enumerable: true,
    configurable: true
})
 */

// console.log(obj1, obj);
// console.log(Object.getOwnPropertyDescriptor(obj1, 'a'));
/* Object.preventExtensions(obj1)
// delete obj1.a
obj1.b = 3
console.log(obj1);
 */

var obj = {
  get a() {
    return "a";
  },
};
Object.defineProperty(obj, "b", {
  get() {
    return "b";
  },
  enumerable: false,
});

obj.a = "aaa";
// console.log(obj.a, obj.b);
// console.log(obj.hasOwnProperty('a'));
// console.log(obj.propertyIsEnumerable('b'))

/* var it = (val)=> {
    let init = 1
    return {
        next() {
            const isEnd = init > val
            return {
                value: isEnd ? undefined : init++,
                done: isEnd
            }
        }
    }
}
var it2 = it(4) */

// console.log(it2.next());
// console.log(it2.next());
// console.log(it2.next());
// console.log(it2.next());
// console.log(it2.next());
// console.log(it2.next());

// 为对象定义一个迭代器对象
/* var obj = {
    a:1,
    b:2
}

Object.defineProperty(obj, Symbol.iterator, {
    get() {
        const self = this
        let i = 0
        const ks = Object.keys(self)
        let isDone = false
        return function() {
            return {
                next() {
                    if(i >= ks.length) {
                        isDone = true
                    }
                    return {
                        value: isDone ? undefined : self[ks[i++]], 
                        done: isDone,
                    }
                }
            }
        }
    },
    
    enumerable: true,
    configurable: true,
})

var it = obj[Symbol.iterator]()
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next()); */

/* 
var obj = {
    [Symbol.iterator](){
        return {
            next() {
                return {
                    value: Math.random()
                }
            }
        }
    }
}
var arr = []
for(var n of obj) {
    arr.push(n)
    if(arr.length === 100) {
        break
    }
}

console.log(arr.length);
 */

/**---------------------------------- 原型 */
/* var obj = {}
let a = 0
Object.defineProperty(obj, 'a', {
    get() {
        return a
    },
    set(value) {
        a = value * 2
    },
    enumerable: true,
    configurable: true
})

var foo = Object.create(obj)
// foo.a = 2;
Object.defineProperty(foo, 'a', {
    value: 4,
    writable: true,
    enumerable: true,
    configurable: true
})
foo.a = 8 */

// foo.a = 2 时会有三种情况
// 1.foo不存在a属性， 但是foo的[[prototype]]上存在a属性，并且writable为true，那么会为foo本身添加属性a，该属性为屏蔽属性
// 2.foo不存在a属性，但是foo的[[prototype]]上存在a属性，并且writable为false,那么不会为foo添加新的属性
// 3.foo不存在a属性，但是foo的[[prototype]]上存在a属性，并且有setter，那么无论如何都会调用setter，而不会为foo添加新的屏蔽属性

// console.log(foo, obj);

function Foo() {}
var a = new Foo();

// console.log(Object.getPrototypeOf(a) === Foo.prototype);
// console.log(Object.getPrototypeOf(Foo) === Function.prototype);
/* 
function A () {

}
var a = new A()



a.__proto__ === A.prototype

// 每个构造函数都会有一个Prototype属性，该构造函数创建出来的子类的原型就会指向构造函数的prototype

function vehicle() {}
function car() {}

var obj1 = Object.create(vehicle.prototype)
car.prototype = obj1
// car.prototype.constructor = car
Object.defineProperty(car.prototype, 'constructor', {
    value: car,
    writable: true,
    enumerable: false,
    configurable: true
})

var car2 = new car()
for(let k in car2) {
    console.log(k);
} */

// obj1.__proto__ === vehicle.prototype

/* function Foo() {
    // console.log('Foo');
}
Foo.prototype.sayName = function() {
    console.log('sayName Foo');
}

function Bar() {
    // console.log('Bar');
}

// Bar.prototype = Object.create(Foo.prototype)
Object.setPrototypeOf(Bar.prototype, Foo.prototype)

var bar = new Bar()
bar.sayName()

console.log(bar instanceof Bar) */
/* 
var a = {}
var b = Object.create(a)

// 判断o1是否关联到o2
function isRelatedTo(o1, o2) {
    function Foo() {}
    Foo.prototype = o2

    // return  o1 instanceof Foo
    return insOf(o1, Foo)
}

// 模拟instanceof
function insOf(o1, o2) {
    let o = o1
    let flag = false
    while(o) {
        if(o === o2.prototype) {
            o = null
            flag = true
        } else {
            o = Object.getPrototypeOf(o)
        }
    }

    return flag
}

// console.log(isRelatedTo(b, a))
console.log(insOf([], Array));
console.log( a.isPrototypeOf(b) ); */

/* function objectCreate(o) {
  function F() {}
  F.prototype = o;
  Object.defineProperty(F.prototype, "constructor", {
    value: F,
    enumerable: false,
    writable: true,
    configurable: true,
  });

  return new F();
}

var obj = { a: 1 };
var foo = objectCreate(obj);

console.log(obj.a, foo.a);
obj.a = 2;
console.log(obj.a, foo.a); */

/* var anotherObject = {
    cool() {
        console.log('cool');
    }
}
var myObject = Object.create(anotherObject)
myObject.doCool = function() {
    // 做自己想做的事
    console.log('private');
    debugger
    this.cool()
}

function cool() {
    console.log('window cool');
}
myObject.doCool()
var fn = myObject.doCool
fn.call(globalThis) */

/**---------------------------------- 委托 */

/* function Foo(who) {
    this.me = who
}
Foo.prototype.identify = function() {
    return 'I am ' + this.me
}

function Bar(who) {
    Foo.call(this, who)
}

Bar.prototype = Object.create(Foo.prototype)
Bar.prototype.speak = function() {
    console.log('Hello,' + this.identify() + '.');
}

var b1 = new Bar('b1')
var b2 = new Bar('b2')
b1.speak()
b2.speak() */

/* var foo = {
    init(who) {
        this.me = who
    },
    indentify() {
        return 'I am ' + this.me
    }
}

var bar = Object.create(foo)
bar.speak = function() {
    console.log('Hello,' + this.indentify());
}

var b1 = Object.create(bar)
b1.init('b1')
b1.speak()

var b2 = Object.create(bar)
b2.init('b2')
b2.speak()
 */

/* function Widget(width, height) {
    this.width = width
    this.height = height
    this.$elem = null
}


Widget.prototype.render = function($where) {
    if(this.$elem) {
        this.$elem.css({
            width: this.width + 'px',
            height: this.height + 'px',

        }).appendTo($where)
    }
}

function Button(width,height,label) {
    Widget.call(this, width, height)
    this.label = label

    this.$elem = `<button>${label}</button>`
}

Button.prototype = Object.create(Widget.prototype)
Button.prototype.render = function() {
    // super调用
    Widget.prototype.render.call(this,$where)
}


class Widget {
    constructor() {}
}


class Button extends Widget {
    constructor(width,height,label) {
        super(width,height)
    }
    render() {
        super() 
        // do something
    }
}
 */

/**
 * 需求 用户输入用户名和密码，用户名或者密码为空时需要提示，不为空时发起请求
 */

/**
 * 基类为form,可以用来提示正确或者错误信息
 * 表单类input 获取表单的值 验证函数
 * login类接收表单类 调用验证函数后 获取值然后发起请求
 */

// 用来提示信息
function Controller() {}
Controller.prototype.success = function(title, msg) {
    console.log(`${title}: ${msg}`)
}
Controller.prototype.failure = function(title, err) {
    console.error(`${title}: ${err}`)
}

// 子类 
function Input(name, value) {
    this.name = name
    this.value = value
    Controller.call(this)
}
Input.prototype = Object.create(Controller.prototype)
// 重写父类方法
Input.prototype.success = function(msg) {
    // super
    Controller.prototype.success.call(this, `Input ${this.name}`, msg)
}
Input.prototype.failure = function(msg) {
    // super
    Controller.prototype.failure.call(this, `Input ${this.name}`, msg)
}
// 获取值
Input.prototype.getValue = function() {
    return this.value
}
// 设置值
Input.prototype.setValue = function(newValue) {
    return this.value = newValue
}
// 验证(这里直接使用非空)
Input.prototype.validate = function() {
    if(this.value) {
        this.success(`${this.name}验证通过`)
    } else {
        this.failure(`${this.name}为空`)
    }
    return this.value
}

// 登录
function LoginController() {}
// LoginController.prototype = Object.create(Controller.prototype)
// // 重写方法
// LoginController.prototype.success = function(msg) {
//     Controller.prototype.success.call(this, `login: `, msg)
// }
// LoginController.prototype.failure = function(msg) {
//     Controller.prototype.failure.call(this, `login: `, msg)
// }

LoginController.prototype.validateInputs = function(inputs, cb) {
    const isValid = inputs.every(inp=> inp.validate())
    cb(isValid)
}

var username = new Input('username', 1)
var password = new Input('password', 1)

username.setValue('')
password.setValue('')


var lc = new LoginController()
lc.validateInputs([username, password],(isValid)=> {
    if(isValid) {
        // 发起请求

    }
})





/**---------------------------------- 对象 */
/**---------------------------------- 对象 */
