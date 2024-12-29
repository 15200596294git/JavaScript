// 农场有头大母牛，每年生头小母牛，小母牛五年后生小母牛，年龄大于15便死亡 ，问20年后农场一共有多少头牛？

// 
function recursion(cows, years) {
  if(years === 0) return cows

  const _cows = cows.reduce((ret, cure)=> {
    if(cure >=5) ret.push(1)
    const afterAge = cure + 1
    if(afterAge <= 15) ret.push(afterAge)

    return ret
  }, [])

  return recursion(_cows, years - 1)
}

// recursion([5], 1)
// console.log("🚀 ~ recursion([5], 1):", recursion([5], 20).length) // 20年后还有396头牛



// 面向对象
class Cow {
  constructor() {
    this.age = 1
  }
  getAge() {
    return this.age
  }
  setAge(age) {
    this.age = age
  }
  plusOneAge() {
    this.age++
  }
  isAlive() {
    return this.age <= 15
  }
  // 是否成年
  isAdult() {
    return this.age >= 5
  }
}

class Farm {
  constructor() {
    this.cows = []
  }
  getCows() {
    return this.cows
  }
  addCow(cow) {
    this.cows.push(cow)
  }
  // 获得活着的牛
  getCowsOfAlive() {
    return this.cows.filter(cow=> cow.isAlive())
  }
}

const farm = new Farm()
const firstCow = new Cow()
firstCow.setAge(5)
farm.addCow(firstCow)

for(let i = 0; i < 20; i++) {
  farm.getCows().forEach(cow=> {
    if(cow.isAdult() && cow.isAlive()) farm.addCow(new Cow())
    
    
    cow.plusOneAge()
  })
}

// console.log(farm.getCowsOfAlive().length)

function mixin(sourceObj, targetObj) {
  for(let k in sourceObj) {
    if(!(k in targetObj)) {
      targetObj[k] = sourceObj[k]
    }
  }

  return targetObj
}

// var Vehicle = {
//   engines: 1,
//   ignition() {
//     console.log('Turning on my engine');
//   },
//   drive() {
//     this.ignition()
//     console.log('Steering and moving forward');
//   }
// }

// var Car = mixin(Vehicle, {
//   wheels: 4,
//   drive() {
//     Vehicle.drive.call(this)
//     console.log('Rolling on all' + this.wheels + 'wheels!');
//   }
// })

// console.log(Car);

function Vehicle() {
  this.engines = 1
}
Vehicle.prototype.ignition = function() {
  console.log('Turning on my engine');
}
Vehicle.prototype.drive = function() {
  this.ignition()
  console.log('Steering and moving forward');
}

function Car() {
  var car = new Vehicle()
  // 订制
  car.wheels = 4

  var vehDrive = car.drive

  // 重写drive
  car.drive = function() {
    vehDrive.call(this)
  }

  return car
}

// const car = new Car()
// car.drive()

// function Foo() {}
// var f1 = new Foo()

/**
 * Foo是构造函数
 * Foo有一个prototype属性
 * Foo的prototype属性有一个constructor属性，constructor指向构造函数本身，当前就是Foo
 * 
 * f1是Foo的实例
 * f1的原型对象指向其构造函数的prototype, f1.__proto__ === Foo.prototype
 * f1会'继承'Foo.prorotype中的属性 [[prorotype]]原型链
 * f1.constructor === Foo.prototype.constructor
*/
// console.log("🚀 ~ prototype, f1.__proto__ === Foo.prorotype:", f1.__proto__ === Foo.prototype)
// console.log("🚀 ~ f1.constructor ==== Foo.prototype.constructor:", f1.constructor === Foo.prototype.constructor)

// 如果构造函数的prototype指向发生变化
// 那么变化前和变化后所创建的示例的[[prototype]]指向也是不一样的
// 不过这个应该是显而易见的,因为其是引用,这相当于直接改变了引用,所以一般情况下不推荐
// 可以通过Foo.prorotype.a = 2 这种方法来修改或者添加prototype对象属性的值
// function Foo() {}
// Foo.prototype = {
//   constructor: Foo,
//   a: 1
// }

// var f1 = new Foo()
// console.log("🚀 ~ f1.a:", f1.a)

// Foo.prototype = {
//   constructor: Foo,
//   a: 2,
//   b:3
// }

// var f2 = new Foo()
// console.log("🚀 ~ f1.a:", f1.a)
// console.log("🚀 ~ f2.a:", f2.a)


// function Foo() {}
// Foo.prototype = {
//   constructor: Foo,
//   a: 1
// }

// var f1 = new Foo()
// console.log("🚀 ~ f1.a:", f1.a)

// Foo.prototype.a = 2
// Foo.prototype.b = 3
// var f2 = new Foo()

// console.log("🚀 ~ f1.a:", f1.a)
// console.log("🚀 ~ f2.a:", f2.a)

// function Foo() {

// }
// 每个函数都会有一个prototype属性,记住这个prototype只是一个普通属性,虽然它叫prototype
// 然后这个prototype属性的值默认是一个对象,对象里面有一个属性叫做constructor
// 这个constructor也就是构造函数,也就指向函数本身
// console.log("🚀 ~ Foo:", Reflect.ownKeys(Foo.prototype))


// 所有的函数都可以看作是new Function()的实例，那么
// Foo.__proto__ === Function.prototype
// Function.__proto__ === Function.prototype

// Function.prototype作为一个对象，它肯定是由Object实例化得来的
// Function.prototype.__proto__ === Object.prototype
// Object再往上就是null了
// Object.prototype.__proto__ === null
// Object也有自己的__proto__, 因为Object是一个函数，根据前面所得
// Object.__proto__ === Function.prototype


