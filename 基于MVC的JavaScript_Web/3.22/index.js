/**
 * 断言一个值是否为真值 
 * @param {any} value
 * @param {string} msg
 */
function assert(value, msg) {
  if(!value) {
    throw(msg || (value + '不等于true'))
  }
}

/**
 * 断言两个值是否相等
 * @param {any} value1 
 * @param {any} value2 
 * @param {string} msg 
 */
function assertEqual(value1, value2, msg) {
  if(value1 !== value2) {
    throw(msg || `${value1} 不等于 ${value2}`)
  }
}

/**
 * 类库
 * 用new调用后 返回一个类
 * 可以方便的在这个类上面添加静态属性(方法)或者原型上的属性(方法)
 * 需要一个Person类，Person需要有静态属性MIN_AGE 原型对象需要有say方法
 * var Person = new MyClass()
 * Person.extend({
 *   MIN_AGE: 0
 * })
 * Person.include({
 *   say() {
 *     console.log(`Hello,I am ${this.name}`)   
 *   }
 * })
 * 
 * Person.MIN_AGE // 0
 * var lily = new Person()
 * lily.MIN_AGE // 0
 * lily.say() // Hello, I am xxx
 */
var MyClass = function(parent) {
  function klass(...args) {
    this.init(...args)
  }

  // 改变klass的原型
  if(parent) {
    var subclass = function() {}
    subclass.prototype = parent.prototype
    klass.prototype = new subclass()
  }


  // prototype 别名
  klass.fn = klass.prototype

  klass.fn.init = function(name) {
    this.name = name
  }

  // 添加proxy
  klass.proxy = function(func) {
    const self = this
    return function(...args) {
      return func.apply(self, args)
    }
  }
  klass.fn.proxy = klass.prototype

  // 设置parent
  klass.fn.parent = MyClass
  
  // 别名添加
  klass._super = klass.__proto__

  // 给类添加属性 (静态)
  klass.extend = function(obj) {
    const extended = obj.extended
    Object.keys(obj)
    .forEach(k=> klass[k] = obj[k])

    if(extended) {
      extended(klass)
    }
  }

  // 给实例添加属性 (原型对象)
  klass.include = function(obj) {
    const included = obj.included
    Object.keys(obj)
    .forEach(k=> klass.fn[k] = obj[k])

    if(included) {
      included(klass)
    }
  }

  // new调用，但是有return返回，并且返回的类型是一个'object'
  return klass
}

var Person = new MyClass()
Person.extend({
  MIN_AGE: 0,
  extended() {
    console.log('was extended');
  }
})
Person.include({
  say() {
    return this.name
  },
  included() {
    console.log('was included');
  }
})

// var lily = new Person('lily')
// Person.MIN_AGE
// lily.MIN_AGE
// lily.say()


function proxy(func) {
  const self = this
  return function(...args) {
    return func.apply(self, args)
  }
}

// 事件和监听


